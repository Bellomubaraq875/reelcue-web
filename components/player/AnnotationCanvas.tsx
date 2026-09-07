"use client";

import { useRef } from "react";
import { useAnnotationStore, type Annotation } from "@/stores/useAnnotationStore";

// Sits absolutely positioned over the video. Points are stored as 0–1
// ratios of the frame, so drawings stay correctly placed regardless of
// how large the player is rendered.
export function AnnotationCanvas() {
    const svgRef = useRef<SVGSVGElement>(null);
    const activeTool = useAnnotationStore((s) => s.activeTool);
    const draftAnnotation = useAnnotationStore((s) => s.draftAnnotation);
    const annotations = useAnnotationStore((s) => s.annotations);
    const startDraft = useAnnotationStore((s) => s.startDraft);
    const appendToDraft = useAnnotationStore((s) => s.appendToDraft);
    const commitDraft = useAnnotationStore((s) => s.commitDraft);

    function relativePoint(e: React.PointerEvent<SVGSVGElement>) {
        const rect = svgRef.current!.getBoundingClientRect();
        return {
            x: (e.clientX - rect.left) / rect.width,
            y: (e.clientY - rect.top) / rect.height,
        };
    }

    function handlePointerDown(e: React.PointerEvent<SVGSVGElement>) {
        if (activeTool === "none") return;
        startDraft(activeTool, relativePoint(e));
    }

    function handlePointerMove(e: React.PointerEvent<SVGSVGElement>) {
        if (activeTool === "none" || !draftAnnotation) return;
        appendToDraft(relativePoint(e));
    }

    function handlePointerUp() {
        if (activeTool === "none") return;
        commitDraft();
    }

    return (
        <svg
            ref={svgRef}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className={`absolute inset-0 h-full w-full ${activeTool !== "none" ? "cursor-crosshair" : "pointer-events-none"
                }`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
        >
            <defs>
                <marker
                    id="annotation-arrowhead"
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="5"
                    markerHeight="5"
                    orient="auto-start-reverse"
                >
                    <path d="M0 0L10 5L0 10Z" fill="context-stroke" />
                </marker>
            </defs>
            {annotations.map((a) => (
                <ShapeFor key={a.id} annotation={a} />
            ))}
            {draftAnnotation && <ShapeFor annotation={draftAnnotation} />}
        </svg>
    );
}

function ShapeFor({ annotation }: { annotation: Annotation }) {
    const pts = annotation.points.map((p) => `${p.x * 100},${p.y * 100}`);
    const first = annotation.points[0];
    const last = annotation.points[annotation.points.length - 1];

    if (annotation.tool === "pen") {
        return (
            <polyline
                points={pts.join(" ")}
                fill="none"
                stroke={annotation.color}
                strokeWidth={0.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
            />
        );
    }

    if (annotation.tool === "rectangle") {
        const x = Math.min(first.x, last.x) * 100;
        const y = Math.min(first.y, last.y) * 100;
        const w = Math.abs(last.x - first.x) * 100;
        const h = Math.abs(last.y - first.y) * 100;
        return (
            <rect
                x={x}
                y={y}
                width={w}
                height={h}
                fill="none"
                stroke={annotation.color}
                strokeWidth={0.6}
                vectorEffect="non-scaling-stroke"
            />
        );
    }

    // arrow
    return (
        <line
            x1={first.x * 100}
            y1={first.y * 100}
            x2={last.x * 100}
            y2={last.y * 100}
            stroke={annotation.color}
            strokeWidth={0.6}
            markerEnd="url(#annotation-arrowhead)"
            vectorEffect="non-scaling-stroke"
        />
    );
}