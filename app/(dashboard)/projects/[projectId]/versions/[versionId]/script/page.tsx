"use client";

import { useVersion } from "@/hooks/useVersion";
import { useScript } from "@/hooks/useScript";
import { VersionTabs } from "@/components/player/VersionTabs";
import { EmptyState } from "@/components/ui/EmptyState";

export default function ScriptPage({
    params,
}: {
    params: { projectId: string; versionId: string };
}) {
    const { data: version } = useVersion(params.versionId);
    const { data: script, isLoading } = useScript(params.versionId);

    if (isLoading) return null; // loading.tsx skeleton covers this

    return (
        <div className="mx-auto max-w-5xl px-8 py-10">
            <p className="text-sm text-ink-500">{version?.projectName}</p>
            <h1 className="mt-1 font-serif text-2xl text-ink">
                Version {version?.versionNumber} · Script
            </h1>

            <div className="mt-6">
                <VersionTabs projectId={params.projectId} versionId={params.versionId} />
            </div>

            {!script?.rawTranscript ? (
                <div className="mt-8">
                    <EmptyState
                        title="Transcription not ready yet"
                        description="The script appears here automatically once transcription and cleanup finish processing."
                    />
                </div>
            ) : (
                <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div>
                        <p className="text-sm font-medium text-ink-500">Raw transcript</p>
                        <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-ink-500">
                            {script.rawTranscript}
                        </p>
                    </div>
                    <div className="border-l border-line pl-8">
                        <p className="text-sm font-medium text-brass-600">AI-cleaned script</p>
                        <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-ink">
                            {script.cleanedScript ?? "Cleanup still in progress…"}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}