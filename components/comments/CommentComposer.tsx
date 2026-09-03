"use client";

import { useState } from "react";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { usePostComment } from "@/hooks/useComments";

type CommentComposerProps = {
    versionId: string;
    authorName: string;
    authorEmail?: string;
};

function formatTimestamp(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
}

export function CommentComposer({
    versionId,
    authorName,
    authorEmail,
}: CommentComposerProps) {
    const [body, setBody] = useState("");
    const currentTime = usePlayerStore((s) => s.currentTime);
    const { mutate: postComment, isPending } = usePostComment(versionId);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!body.trim()) return;

        postComment(
            {
                versionId,
                authorName,
                authorEmail,
                timestampSeconds: currentTime,
                body: body.trim(),
            },
            { onSuccess: () => setBody("") }
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 border-t border-line pt-4">
            <div className="flex items-center gap-2 text-xs text-ink-500">
                <span>Commenting at</span>
                <span className="bg-brass-100 px-1.5 py-0.5 font-medium text-brass-600">
                    {formatTimestamp(currentTime)}
                </span>
            </div>
            <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Leave feedback at this moment in the video..."
                rows={3}
                className="w-full border border-line bg-paper-100 p-2 text-sm text-ink outline-none focus:border-ink"
            />
            <button
                type="submit"
                disabled={isPending || !body.trim()}
                className="self-end bg-ink px-4 py-2 text-sm font-medium text-paper-100 transition hover:bg-ink-800 disabled:opacity-40"
            >
                {isPending ? "Posting…" : "Post comment"}
            </button>
        </form>
    );
}