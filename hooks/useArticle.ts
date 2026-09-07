import { useQuery } from "@tanstack/react-query";

export type ArticleStep = {
    id: string;
    order: number;
    text: string;
    screenshotUrl: string | null;
    timestampSeconds: number | null;
};

export type ArticleData = {
    title: string;
    steps: ArticleStep[];
};

async function fetchArticle(versionId: string): Promise<ArticleData | null> {
    const res = await fetch(`/api/versions/${versionId}/knowledge-base`);
    if (res.status === 404) return null; // not generated yet — not an error state
    if (!res.ok) throw new Error("Failed to load guide");
    return res.json();
}

export function useArticle(versionId: string) {
    return useQuery({
        queryKey: ["article", versionId],
        queryFn: () => fetchArticle(versionId),
        enabled: !!versionId,
    });
}