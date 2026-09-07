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
    annotations: Annotation[];

    setActiveTool: (tool: AnnotationTool) => void;
    setActiveColor: (color: string) => void;
    startDraft: (tool: AnnotationTool, point: Point) => void;
    appendToDraft: (point: Point) => void;
    commitDraft: () => void;
    clearAnnotations: () => void;
};

// Points are stored as 0–1 ratios of the video frame, not pixels, so
// drawings stay correctly positioned if the player is resized.
export const useAnnotationStore = create<AnnotationState>((set, get) => ({
    activeTool: "none",
    activeColor: "#B08D57",
    draftAnnotation: null,
    annotations: [],

    setActiveTool: (tool) => set({ activeTool: tool, draftAnnotation: null }),
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

    // Moves the in-progress drawing into the committed list on pointer-up.
    commitDraft: () => {
        const draft = get().draftAnnotation;
        if (!draft || draft.points.length < 2) {
            set({ draftAnnotation: null });
            return;
        }
        set((state) => ({
            annotations: [...state.annotations, draft],
            draftAnnotation: null,
        }));
    },

    clearAnnotations: () => set({ annotations: [] }),
}));