import { useQuery } from "@tanstack/react-query";

export type VersionDetail = {
    id: string;
    versionNumber: number;
    status: "PROCESSING" | "READY" | "FAILED";
    approvalStatus: "PENDING" | "IN_REVIEW" | "APPROVED" | "CHANGES_REQUESTED";
    storageUrl: string | null;
    projectName: string;
};

async function fetchVersion(versionId: string): Promise<VersionDetail> {
    const res = await fetch(`/api/versions/${versionId}`);
    if (!res.ok) throw new Error("Failed to load video version");
    return res.json();
}

export function useVersion(versionId: string) {
    return useQuery({
        queryKey: ["version", versionId],
        queryFn: () => fetchVersion(versionId),
        enabled: !!versionId,
    });
}