"use client";

import { useVersion } from "@/hooks/useVersion";
import { useArticle } from "@/hooks/useArticle";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { VersionTabs } from "@/components/player/VersionTabs";
import { EmptyState } from "@/components/ui/EmptyState";

function formatTimestamp(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function KnowledgeBasePage({
    params,
}: {
    params: { projectId: string; versionId: string };
}) {
    const { data: version } = useVersion(params.versionId);
    const { data: article, isLoading } = useArticle(params.versionId);
    const requestSeek = usePlayerStore((s) => s.requestSeek);

    if (isLoading) return null; // loading.tsx skeleton covers this

    return (
        <div className="mx-auto max-w-3xl px-8 py-10">
            <p className="text-sm text-ink-500">{version?.projectName}</p>
            <h1 className="mt-1 font-serif text-2xl text-ink">
                Version {version?.versionNumber} · Knowledge base
            </h1>

            <div className="mt-6">
                <VersionTabs projectId={params.projectId} versionId={params.versionId} />
            </div>

            {!article ? (
                <div className="mt-8">
                    <EmptyState
                        title="Guide not generated yet"
                        description="A step-by-step how-to article is built automatically from the video once processing finishes."
                    />
                </div>
            ) : (
                <div className="mt-8">
                    <h2 className="font-serif text-xl text-ink">{article.title}</h2>

                    <ol className="mt-6 space-y-6">
                        {article.steps.map((step) => (
                            <li key={step.id} className="flex gap-4">
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-brass-100 font-serif text-sm text-brass-600">
                                    {step.order}
                                </span>
                                <div className="flex-1">
                                    <p className="text-sm leading-relaxed text-ink">{step.text}</p>

                                    {step.timestampSeconds !== null && (
                                        <button
                                            onClick={() => requestSeek(step.timestampSeconds!)}
                                            className="mt-1 text-xs font-medium text-ink-500 hover:text-brass-600"
                                        >
                                            Jump to {formatTimestamp(step.timestampSeconds)} in the video →
                                        </button>
                                    )}

                                    {!step.screenshotUrl && (
                                        <div className="mt-2 flex h-24 w-40 items-center justify-center border border-dashed border-line text-xs text-ink-500/60">
                                            Screenshot pending
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            )}
        </div>
    );
}