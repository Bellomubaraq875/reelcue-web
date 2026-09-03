"use client";

import Link from "next/link";
import { useProject } from "@/hooks/useProject";
import { EmptyState } from "@/components/ui/EmptyState";

const APPROVAL_LABEL: Record<string, string> = {
    PENDING: "Pending",
    IN_REVIEW: "In review",
    APPROVED: "Approved",
    CHANGES_REQUESTED: "Changes requested",
};

const APPROVAL_COLOR: Record<string, string> = {
    PENDING: "text-ink-500",
    IN_REVIEW: "text-brass-600",
    APPROVED: "text-moss",
    CHANGES_REQUESTED: "text-rust",
};

export default function ProjectDetailPage({
    params,
}: {
    params: { projectId: string };
}) {
    const { data: project, isLoading } = useProject(params.projectId);

    if (isLoading) return null; // loading.tsx skeleton covers this
    if (!project) return null;

    return (
        <div className="mx-auto max-w-4xl px-8 py-10">
            <Link href="/projects" className="text-sm text-ink-500 hover:text-ink">
                ← Projects
            </Link>

            <h1 className="mt-3 text-2xl font-medium text-ink">{project.name}</h1>
            {project.clientName && (
                <p className="mt-1 text-sm text-ink-500">{project.clientName}</p>
            )}

            {project.versions.length === 0 ? (
                <div className="mt-8">
                    <EmptyState
                        title="No versions uploaded yet"
                        description="Upload a video to start collecting timestamped feedback on it."
                    />
                </div>
            ) : (
                <div className="mt-8 divide-y divide-line border-t border-line">
                    {project.versions.map((version) => (
                        <Link
                            key={version.id}
                            href={`/projects/${project.id}/versions/${version.id}`}
                            className="flex items-center justify-between py-4 transition hover:opacity-70"
                        >
                            <div>
                                <p className="font-serif text-lg text-ink">
                                    Version {version.versionNumber}
                                </p>
                                <p className="text-xs text-ink-500">
                                    {version.status === "PROCESSING"
                                        ? "Processing…"
                                        : new Date(version.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <span
                                className={`text-sm font-medium ${APPROVAL_COLOR[version.approvalStatus]}`}
                            >
                                {APPROVAL_LABEL[version.approvalStatus]}
                            </span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}