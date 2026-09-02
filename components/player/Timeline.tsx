"use client";

import { usePlayerStore } from "@/stores/usePlayerStore";
import type { Comment } from "@/hooks/useComments";

type TimelineProps = {
    comments: Comment[];
};

export function Timeline({ comments }: TimelineProps) {
    const currentTime = usePlayerStore((s) => s.currentTime);
    const duration = usePlayerStore((s) => s.duration);
    const requestSeek = usePlayerStore((s) => s.requestSeek);

    const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

    function handleScrubClick(e: React.MouseEvent<HTMLDivElement>) {
        if (duration <= 0) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const ratio = (e.clientX - rect.left) / rect.width;
        requestSeek(ratio * duration);
    }

    return (
        <div className="relative h-8 w-full">
            <div
                className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 cursor-pointer rounded-full bg-neutral-200"
                onClick={handleScrubClick}
            >
                <div
                    className="h-full rounded-full bg-neutral-900"
                    style={{ width: `${progressPct}%` }}
                />
            </div>

            {duration > 0 &&
                comments.map((comment) => (
                    <button
                        key={comment.id}
                        title={comment.body}
                        onClick={() => requestSeek(comment.timestampSeconds)}
                        className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-amber-500 hover:scale-125"
                        style={{
                            left: `${(comment.timestampSeconds / duration) * 100}%`,
                        }}
                    />
                ))}
        </div>
    );
}