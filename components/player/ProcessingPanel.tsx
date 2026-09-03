"use client";

import { useJobStatus, type JobStatus } from "@/hooks/useJobStatus";

const JOB_LABEL: Record<JobStatus["type"], string> = {
    TRANSCRIBE: "Transcribing audio",
    SCRIPT_CLEANUP: "Cleaning up the script",
    CAPTIONS: "Generating captions",
    SOP_GENERATION: "Building step-by-step guide",
    DUBBING: "Generating dubbed audio",
};

export function ProcessingPanel({ versionId }: { versionId: string }) {
    const { data: jobs } = useJobStatus(versionId);

    const rows = jobs && jobs.length > 0
        ? jobs
        : [{ type: "TRANSCRIBE" as const, status: "PENDING" as const }];

    return (
        <div className="flex aspect-video w-full flex-col items-center justify-center gap-4 bg-ink px-8">
            <p className="font-serif text-lg text-paper">Processing your video</p>
            <ul className="w-full max-w-xs space-y-2">
                {rows.map((job) => (
                    <li key={job.type} className="flex items-center gap-3 text-sm">
                        <span
                            className={`h-1.5 w-1.5 shrink-0 rounded-full ${job.status === "COMPLETED"
                                    ? "bg-moss"
                                    : job.status === "FAILED"
                                        ? "bg-rust"
                                        : "animate-pulse bg-brass"
                                }`}
                        />
                        <span
                            className={
                                job.status === "COMPLETED" ? "text-paper/50 line-through" : "text-paper/80"
                            }
                        >
                            {JOB_LABEL[job.type]}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}