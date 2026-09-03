"use client";

import { useEffect, useRef } from "react";
import { usePlayerStore } from "@/stores/usePlayerStore";

type VideoPlayerProps = {
    src: string;
};

export function VideoPlayer({ src }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    const setCurrentTime = usePlayerStore((s) => s.setCurrentTime);
    const setIsPlaying = usePlayerStore((s) => s.setIsPlaying);
    const setDuration = usePlayerStore((s) => s.setDuration);
    const seekTo = usePlayerStore((s) => s.seekTo);
    const clearSeekRequest = usePlayerStore((s) => s.clearSeekRequest);

    useEffect(() => {
        if (seekTo === null || !videoRef.current) return;
        videoRef.current.currentTime = seekTo;
        clearSeekRequest();
    }, [seekTo, clearSeekRequest]);

    return (
        <video
            ref={videoRef}
            src={src}
            controls
            className="w-full bg-ink"
            onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
        />
    );
}