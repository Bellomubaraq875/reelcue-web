"use client";

import { useVersion } from "@/hooks/useVersion";
import { useCaptionTrack } from "@/hooks/useCaptionTrack";
import { VersionTabs } from "@/components/player/VersionTabs";
import { VideoPlayer } from "@/components/player/VideoPlayer";
import { CaptionOverlay } from "@/components/player/CaptionOverlay";
import { EmptyState } from "@/components/ui/EmptyState";
import { parseVtt } from "@/lib/vtt";

export default function CaptionsPage({
    params,
}: {
    params: { projectId: string; versionId: string };
}) {
    const { data: version } = useVersion(params.versionId);
    const { data: captions, isLoading } = useCaptionTrack(params.versionId);

    if (isLoading) return null; // loading.tsx skeleton covers this

    return (
        <div className="mx-auto max-w-5xl px-8 py-10">
            <p className="text-sm text-ink-500">{version?.projectName}</p>
            <h1 className="mt-1 font-serif text-2xl text-ink">
                Version {version?.versionNumber} · Captions
            </h1>

            <div className="mt-6">
                <VersionTabs projectId={params.projectId} versionId={params.versionId} />
            </div>

            {!captions ? (
                <div className="mt-8">
                    <EmptyState
                        title="Captions not generated yet"
                        description="Styled captions appear here once the AI caption job finishes."
                    />
                </div>
            ) : (
                <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="relative lg:col-span-2">
                        {version?.storageUrl && <VideoPlayer src={version.storageUrl} />}
                        <CaptionOverlay
                            vttData={captions.vttData}
                            stylePreset={captions.stylePreset ?? undefined}
                        />
                    </div>

                    <div className="lg:col-span-1">
                        <p className="text-sm font-medium text-ink-500">Cue list</p>
                        <div className="mt-3 max-h-96 space-y-3 overflow-y-auto">
                            {parseVtt(captions.vttData).map((cue, i) => (
                                <div key={i} className="border-b border-line pb-2 text-sm">
                                    <p className="text-xs text-brass-600">
                                        {cue.start.toFixed(1)}s – {cue.end.toFixed(1)}s
                                    </p>
                                    <p className="text-ink-500">{cue.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}