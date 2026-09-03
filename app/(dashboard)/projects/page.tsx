"use client";

import { useProjects } from "@/hooks/useProjects";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { EmptyState } from "@/components/ui/EmptyState";

export default function ProjectsPage() {
    const { data: projects, isLoading } = useProjects();

    if (isLoading) return null; // loading.tsx skeleton covers this

    return (
        <div className="mx-auto max-w-4xl px-8 py-10">
            <h1 className="text-2xl font-medium text-ink">Projects</h1>

            {projects && projects.length === 0 ? (
                <div className="mt-8">
                    <EmptyState
                        title="No projects yet"
                        description="Create a project to start uploading videos and collecting feedback from clients."
                    />
                </div>
            ) : (
                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {projects?.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            )}
        </div>
    );
}