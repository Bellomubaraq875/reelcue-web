import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export type Project = {
    id: string;
    name: string;
    clientName: string | null;
    createdAt: string;
};

async function fetchProjects(): Promise<Project[]> {
    const res = await fetch("/api/projects");
    if (!res.ok) throw new Error("Failed to load projects");
    return res.json();
}

async function createProject(input: { name: string; clientName?: string }) {
    const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error("Failed to create project");
    return res.json();
}

export function useProjects() {
    return useQuery({ queryKey: ["projects"], queryFn: fetchProjects });
}

export function useCreateProject() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });
}