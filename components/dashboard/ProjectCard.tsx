import Link from "next/link";
import type { Project } from "@/hooks/useProjects";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="block border border-line p-4 transition hover:border-ink-500"
    >
      <p className="font-serif text-lg text-ink">{project.name}</p>
      {project.clientName && (
        <p className="text-sm text-ink-500">{project.clientName}</p>
      )}
      <p className="mt-3 text-xs text-ink-500/70">
        Created {new Date(project.createdAt).toLocaleDateString()}
      </p>
    </Link>
  );
}