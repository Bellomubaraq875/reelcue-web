import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

type UploadStatus = "idle" | "uploading" | "finalizing" | "error";

async function finalizeUpload(projectId: string, storageUrl: string) {
    const res = await fetch("/api/uploads/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, storageUrl }),
    });
    if (!res.ok) throw new Error("Failed to register the uploaded video");
    return res.json();
}

export function useUploadVideo(projectId: string) {
    const [status, setStatus] = useState<UploadStatus>("idle");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const queryClient = useQueryClient();

    async function afterUpload(storageUrl: string) {
        setStatus("finalizing");
        await finalizeUpload(projectId, storageUrl);
        queryClient.invalidateQueries({ queryKey: ["project", projectId] });
        setStatus("idle");
    }

    // Real path: request a signed upload URL, PUT the file straight to
    // storage, then tell the webhook it's done. Won't fully work until
    // /api/uploads/presign has real Cloudinary/S3 credentials wired in —
    // that's a deliberate TODO, not a bug here.
    async function uploadFile(file: File) {
        setStatus("uploading");
        setErrorMessage(null);
        try {
            const presignRes = await fetch("/api/uploads/presign", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fileName: file.name,
                    fileType: file.type,
                    projectId,
                }),
            });
            if (!presignRes.ok) throw new Error("Could not get an upload URL");
            const { url } = await presignRes.json();

            const putRes = await fetch(url, { method: "PUT", body: file });
            if (!putRes.ok) throw new Error("Upload to storage failed");

            await afterUpload(url.split("?")[0]);
        } catch (err) {
            setStatus("error");
            setErrorMessage(err instanceof Error ? err.message : "Upload failed");
        }
    }

    // Fallback path: skip storage entirely and register an already-hosted
    // video URL directly. Lets the rest of the app (versions, review,
    // comments) be exercised today without storage credentials.
    async function submitUrl(videoUrl: string) {
        setStatus("finalizing");
        setErrorMessage(null);
        try {
            await afterUpload(videoUrl);
        } catch (err) {
            setStatus("error");
            setErrorMessage(err instanceof Error ? err.message : "Could not add video");
        }
    }

    return { status, errorMessage, uploadFile, submitUrl };
}