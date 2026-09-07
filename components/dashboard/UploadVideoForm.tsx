"use client";

import { useState } from "react";
import { useUploadVideo } from "@/hooks/useUploadVideo";

type UploadVideoFormProps = {
    projectId: string;
};

export function UploadVideoForm({ projectId }: UploadVideoFormProps) {
    const { status, errorMessage, uploadFile, submitUrl } = useUploadVideo(projectId);
    const [videoUrl, setVideoUrl] = useState("");
    const busy = status === "uploading" || status === "finalizing";

    function handleUrlSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!videoUrl.trim()) return;
        submitUrl(videoUrl.trim());
        setVideoUrl("");
    }

    return (
        <div className="border border-line p-4">
            <p className="text-sm font-medium text-ink">Add a video</p>

            <label className="mt-3 block text-xs text-ink-500">
                Upload a file
            </label>
            <input
                type="file"
                accept="video/*"
                disabled={busy}
                onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0])}
                className="mt-1 w-full text-sm text-ink-500 disabled:opacity-40"
            />

            <div className="my-4 flex items-center gap-3 text-xs text-ink-500/70">
                <div className="h-px flex-1 bg-line" />
                or
                <div className="h-px flex-1 bg-line" />
            </div>

            <form onSubmit={handleUrlSubmit} className="flex gap-2">
                <input
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="Paste a hosted video URL"
                    disabled={busy}
                    className="flex-1 border border-line bg-paper-100 px-3 py-2 text-sm text-ink outline-none focus:border-ink disabled:opacity-40"
                />
                <button
                    type="submit"
                    disabled={busy || !videoUrl.trim()}
                    className="bg-ink px-4 py-2 text-sm font-medium text-paper-100 transition hover:bg-ink-800 disabled:opacity-40"
                >
                    Add
                </button>
            </form>

            {busy && (
                <p className="mt-2 text-xs text-brass-600">
                    {status === "uploading" ? "Uploading…" : "Setting up processing…"}
                </p>
            )}
            {errorMessage && <p className="mt-2 text-xs text-rust">{errorMessage}</p>}
        </div>
    );
}