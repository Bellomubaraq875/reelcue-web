import { create } from "zustand";

export type AnnotationTool = "none" | "pen" | "arrow" | "rectangle";

type Point = { x: number; y: number };
export type Annotation = {
    id: string;
    tool: AnnotationTool;
    points: Point[];
    color: string;
};

type AnnotationState = {
    activeTool: AnnotationTool;
    activeColor: string;
    draftAnnotation: Annotation | null;

    setActiveTool: (tool: AnnotationTool) => void;
    setActiveColor: (color: string) => void;
    startDraft: (tool: AnnotationTool, point: Point) => void;
    appendToDraft: (point: Point) => void;
    clearDraft: () => void;
};

export const useAnnotationStore = create<AnnotationState>((set, get) => ({
    activeTool: "none",
    activeColor: "#ef4444",
    draftAnnotation: null,

    setActiveTool: (tool) => set({ activeTool: tool }),
    setActiveColor: (color) => set({ activeColor: color }),

    startDraft: (tool, point) =>
        set({
            draftAnnotation: {
                id: crypto.randomUUID(),
                tool,
                points: [point],
                color: get().activeColor,
            },
        }),

    appendToDraft: (point) => {
        const draft = get().draftAnnotation;
        if (!draft) return;
        set({ draftAnnotation: { ...draft, points: [...draft.points, point] } });
    },

    clearDraft: () => set({ draftAnnotation: null }),
}));