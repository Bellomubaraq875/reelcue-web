"use client";

import Link from "next/link";
import { useVersion } from "@/hooks/useVersion";
import { useComments } from "@/hooks/useComments";
import { useUpdateApproval, type ApprovalStatus } from "@/hooks/useApproval";
import { VideoPlayer } from "@/components/player/VideoPlayer";
import { Timeline } from "@/components/player/Timeline";
import { ProcessingPanel } from "@/components/player/ProcessingPanel";
import { CommentThread } from "@/components/comments/CommentThread";
import { CommentComposer } from "@/components/comments/CommentComposer";

const APPROVAL_LABEL: Record<ApprovalStatus, string> = {
    PENDING: "Pending",
    IN_REVIEW: "In review",
    APPROVED: "Approved",
    CHANGES_REQUESTED: "Changes requested",
};

export default function VersionReviewPage({
    params,
}: {
    params: { projectId: string; versionId: string };
}) {
    const { data: version, isLoading: versionLoading } = useVersion(params.versionId);
    const { data: comments } = useComments(params.versionId);
    const { mutate: updateApproval, isPending: approvalPending } = useUpdateApproval(
        params.versionId
    );

    if (versionLoading) return null; // loading.tsx skeleton covers this
    if (!version) return null;

    const isProcessing = version.status === "PROCESSING";
    const commentList = comments ?? [];

    return (
        <div className="mx-auto max-w-6xl px-8 py-10">
            <Link
                href={`/projects/${params.projectId}`}
                className="text-sm text-ink-500 hover:text-ink"
            >
                ← {version.projectName}
            </Link>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
                <h1 className="font-serif text-2xl text-ink">
                    Version {version.versionNumber}
                </h1>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-ink-500">
                        {APPROVAL_LABEL[version.approvalStatus]}
                    </span>
                    <button
                        onClick={() => updateApproval("CHANGES_REQUESTED")}
                        disabled={approvalPending || isProcessing}
                        className="border border-line px-3 py-1.5 text-sm font-medium text-ink transition hover:border-rust hover:text-rust disabled:opacity-40"
                    >
                        Request changes
                    </button>
                    <button
                        onClick={() => updateApproval("APPROVED")}
                        disabled={approvalPending || isProcessing}
                        className="bg-moss px-3 py-1.5 text-sm font-medium text-paper-100 transition hover:opacity-90 disabled:opacity-40"
                    >
                        Approve
                    </button>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    {isProcessing || !version.storageUrl ? (
                        <ProcessingPanel versionId={params.versionId} />
                    ) : (
                        <>
                            <VideoPlayer src={version.storageUrl} />
                            <div className="mt-3">
                                <Timeline comments={commentList} />
                            </div>
                        </>
                    )}
                </div>

                <div className="flex flex-col gap-6 lg:col-span-1">
                    <CommentThread comments={commentList} />
                    {!isProcessing && (
                        <CommentComposer versionId={params.versionId} authorName="You" />
                    )}
                </div>
            </div>
        </div>
    );
}