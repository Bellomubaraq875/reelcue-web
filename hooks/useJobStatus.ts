import { useQuery } from "@tanstack/react-query";

export type JobStatus = {
    type: "TRANSCRIBE" | "SCRIPT_CLEANUP" | "CAPTIONS" | "SOP_GENERATION" | "DUBBING";
    status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
};

async function fetchJobStatus(versionId: string): Promise<JobStatus[]> {
    const res = await fetch(`/api/jobs?versionId=${versionId}`);
    if (!res.ok) throw new Error("Failed to load job status");
    return res.json();
}

export function useJobStatus(versionId: string) {
    return useQuery({
        queryKey: ["jobs", versionId],
        queryFn: () => fetchJobStatus(versionId),
        refetchInterval: (query) => {
            const jobs = query.state.data;
            const stillRunning = jobs?.some(
                (j) => j.status === "PENDING" || j.status === "PROCESSING"
            );
            return stillRunning ? 3000 : false;
        },
        enabled: !!versionId,
    });
}