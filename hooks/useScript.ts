import { useQuery } from "@tanstack/react-query";

export type ScriptData = {
    rawTranscript: string | null;
    cleanedScript: string | null;
};

async function fetchScript(versionId: string): Promise<ScriptData> {
    const res = await fetch(`/api/versions/${versionId}/script`);
    if (!res.ok) throw new Error("Failed to load script");
    return res.json();
}

export function useScript(versionId: string) {
    return useQuery({
        queryKey: ["script", versionId],
        queryFn: () => fetchScript(versionId),
        enabled: !!versionId,
    });
}