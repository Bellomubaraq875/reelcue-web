"use client";

import { useMemo } from "react";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { parseVtt } from "@/lib/vtt";

export type CaptionStylePreset = {
    fontSize?: string;
    color?: string;
    background?: string;
    position?: "bottom" | "top";
};

type CaptionOverlayProps = {
    vttData: string;
    stylePreset?: CaptionStylePreset;
};

const DEFAULT_STYLE: Required<CaptionStylePreset> = {
    fontSize: "1rem",
    color: "#F6F3EC",
    background: "rgba(20, 22, 28, 0.75)",
    position: "bottom",
};

// Renders as a styled overlay rather than being burned into the video,
// so captions stay editable without re-encoding — see the content
// pipeline notes on caption styling.
export function CaptionOverlay({ vttData, stylePreset }: CaptionOverlayProps) {
    const currentTime = usePlayerStore((s) => s.currentTime);
    const cues = useMemo(() => parseVtt(vttData), [vttData]);
    const style = { ...DEFAULT_STYLE, ...stylePreset };

    const activeCue = cues.find((c) => currentTime >= c.start && currentTime <= c.end);
    if (!activeCue) return null;

    return (
        <div
            className={`pointer-events-none absolute inset-x-0 flex justify-center px-6 ${style.position === "top" ? "top-4" : "bottom-4"
                }`}
        >
            <span
                className="max-w-[80%] px-3 py-1.5 text-center leading-snug"
                style={{
                    fontSize: style.fontSize,
                    color: style.color,
                    backgroundColor: style.background,
                }}
            >
                {activeCue.text}
            </span>
        </div>
    );
}