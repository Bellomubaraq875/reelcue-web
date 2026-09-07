"use client";

import { useAnnotationStore, type AnnotationTool } from "@/stores/useAnnotationStore";

const TOOLS: { id: AnnotationTool; label: string }[] = [
    { id: "none", label: "Select" },
    { id: "pen", label: "Pen" },
    { id: "rectangle", label: "Box" },
    { id: "arrow", label: "Arrow" },
];

const COLORS = ["#B08D57", "#A8563B", "#5C7A5E", "#14161C"];

// Small floating toolbar above the video frame. Deliberately compact —
// this is a supporting tool for feedback, not the main interface.
export function AnnotationToolbar() {
    const activeTool = useAnnotationStore((s) => s.activeTool);
    const activeColor = useAnnotationStore((s) => s.activeColor);
    const setActiveTool = useAnnotationStore((s) => s.setActiveTool);
    const setActiveColor = useAnnotationStore((s) => s.setActiveColor);
    const clearAnnotations = useAnnotationStore((s) => s.clearAnnotations);

    return (
        <div className="flex items-center gap-3 border border-line bg-paper-100 px-3 py-2">
            <div className="flex gap-1">
                {TOOLS.map((tool) => (
                    <button
                        key={tool.id}
                        onClick={() => setActiveTool(tool.id)}
                        className={`px-2 py-1 text-xs font-medium transition ${activeTool === tool.id
                                ? "bg-ink text-paper-100"
                                : "text-ink-500 hover:bg-ink-700/10"
                            }`}
                    >
                        {tool.label}
                    </button>
                ))}
            </div>

            <div className="h-4 w-px bg-line" />

            <div className="flex gap-1.5">
                {COLORS.map((color) => (
                    <button
                        key={color}
                        onClick={() => setActiveColor(color)}
                        aria-label={`Use color ${color}`}
                        className="h-4 w-4 rounded-full border"
                        style={{
                            backgroundColor: color,
                            borderColor: activeColor === color ? "#14161C" : "transparent",
                        }}
                    />
                ))}
            </div>

            <div className="h-4 w-px bg-line" />

            <button
                onClick={clearAnnotations}
                className="text-xs font-medium text-ink-500 hover:text-rust"
            >
                Clear
            </button>
        </div>
    );
}