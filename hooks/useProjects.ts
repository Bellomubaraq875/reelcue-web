import { useQuery } from "@tanstack/react-query";

export type VideoVersion = {
    id: string;
    versionNumber: number;
    status: "PROCESSING" | "READY" | "FAILED";
    approvalStatus: "PENDING" | "IN_REVIEW" | "APPROVED" | "CHANGES_REQUESTED";
    createdAt: string;
};

export type ProjectDetail = {
    id: string;
    name: string;
    clientName: string | null;
    versions: VideoVersion[];
};

async function fetchProject(projectId: string): Promise<ProjectDetail> {
    const res = await fetch(`/api/projects/${projectId}`);
    if (!res.ok) throw new Error("Failed to load project");
    return res.json();
}

export function useProject(projectId: string) {
    return useQuery({
        queryKey: ["project", projectId],
        queryFn: () => fetchProject(projectId),
        enabled: !!projectId,
    });
}