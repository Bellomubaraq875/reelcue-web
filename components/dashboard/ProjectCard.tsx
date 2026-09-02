import Link from "next/link";
import type { Project } from "@/hooks/useProjects";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="block rounded-lg border border-neutral-200 p-4 transition hover:border-neutral-400"
    >
      <p className="font-medium text-neutral-900">{project.name}</p>
      {project.clientName && (
        <p className="text-sm text-neutral-500">{project.clientName}</p>
      )}
      <p className="mt-2 text-xs text-neutral-400">
        Created {new Date(project.createdAt).toLocaleDateString()}
      </p>
    </Link>
  );
}