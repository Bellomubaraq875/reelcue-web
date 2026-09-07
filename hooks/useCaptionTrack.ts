import { useQuery } from "@tanstack/react-query";
import type { CaptionStylePreset } from "@/components/player/CaptionOverlay";

export type CaptionTrack = {
    vttData: string;
    stylePreset: CaptionStylePreset | null;
};

async function fetchCaptions(versionId: string): Promise<CaptionTrack | null> {
    const res = await fetch(`/api/versions/${versionId}/captions`);
    if (res.status === 404) return null; // not generated yet — not an error state
    if (!res.ok) throw new Error("Failed to load captions");
    return res.json();
}

export function useCaptionTrack(versionId: string) {
    return useQuery({
        queryKey: ["captions", versionId],
        queryFn: () => fetchCaptions(versionId),
        enabled: !!versionId,
    });
}