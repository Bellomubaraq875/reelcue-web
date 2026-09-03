"use client";

import { usePlayerStore } from "@/stores/usePlayerStore";
import type { Comment } from "@/hooks/useComments";
import { EmptyState } from "@/components/ui/EmptyState";

type CommentThreadProps = {
    comments: Comment[];
};

function formatTimestamp(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
}

export function CommentThread({ comments }: CommentThreadProps) {
    const requestSeek = usePlayerStore((s) => s.requestSeek);

    const topLevel = comments
        .filter((c) => c.parentId === null)
        .sort((a, b) => a.timestampSeconds - b.timestampSeconds);

    const repliesFor = (parentId: string) =>
        comments.filter((c) => c.parentId === parentId);

    if (topLevel.length === 0) {
        return (
            <EmptyState
                title="No feedback yet"
                description="Comments will appear here the moment someone leaves a note on this cut."
            />
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {topLevel.map((comment) => (
                <div key={comment.id} className="border border-line p-3">
                    <CommentRow comment={comment} onSeek={requestSeek} />

                    {repliesFor(comment.id).length > 0 && (
                        <div className="ml-4 mt-2 flex flex-col gap-2 border-l border-line pl-3">
                            {repliesFor(comment.id).map((reply) => (
                                <CommentRow key={reply.id} comment={reply} onSeek={requestSeek} />
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

function CommentRow({
    comment,
    onSeek,
}: {
    comment: Comment;
    onSeek: (seconds: number) => void;
}) {
    return (
        <div className="flex items-start gap-2">
            <button
                onClick={() => onSeek(comment.timestampSeconds)}
                className="shrink-0 bg-ink-700/10 px-1.5 py-0.5 text-xs font-medium text-ink-700 hover:bg-brass-100"
            >
                {formatTimestamp(comment.timestampSeconds)}
            </button>
            <div>
                <p className="text-sm font-medium text-ink">{comment.authorName}</p>
                <p className="text-sm text-ink-500">{comment.body}</p>
            </div>
        </div>
    );
}