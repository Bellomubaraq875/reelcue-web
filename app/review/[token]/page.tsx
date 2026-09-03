"use client";

import { useReviewLink, ReviewLinkError } from "@/hooks/useReviewLink";
import { useComments } from "@/hooks/useComments";
import { useReviewerIdentity } from "@/hooks/useReviewerIdentity";
import { VideoPlayer } from "@/components/player/VideoPlayer";
import { Timeline } from "@/components/player/Timeline";
import { CommentThread } from "@/components/comments/CommentThread";
import { CommentComposer } from "@/components/comments/CommentComposer";
import { ReviewerNameGate } from "@/components/review/ReviewerNameGate";
import { EmptyState } from "@/components/ui/EmptyState";

export default function PublicReviewPage({
    params,
}: {
    params: { token: string };
}) {
    const { data, isLoading, error } = useReviewLink(params.token);
    const { identity, hydrated, saveIdentity } = useReviewerIdentity(params.token);

    // Poll comments separately from the review-link fetch so new feedback
    // from other reviewers shows up without a full page reload.
    const { data: comments } = useComments(data?.version.id ?? "");

    if (isLoading) return null; // loading.tsx skeleton covers this

    if (error instanceof ReviewLinkError) {
        return (
            <PageShell>
                <EmptyState
                    title={error.status === 410 ? "This link has expired" : "Link not available"}
                    description={
                        error.status === 410
                            ? "Ask the project owner to send a new review link."
                            : "This link may have been revoked or never existed. Check the link and try again."
                    }
                />
            </PageShell>
        );
    }

    if (!data) return null;

    const canComment = data.permission !== "VIEW";
    const commentList = comments ?? data.version.comments;

    return (
        <PageShell>
            <p className="text-sm text-ink-500">Version {data.version.versionNumber}</p>

            <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    {data.version.storageUrl ? (
                        <>
                            <VideoPlayer src={data.version.storageUrl} />
                            <div className="mt-3">
                                <Timeline comments={commentList} />
                            </div>
                        </>
                    ) : (
                        <EmptyState
                            title="Video not ready"
                            description="This version is still processing. Check back shortly."
                        />
                    )}
                </div>

                <div className="flex flex-col gap-6 lg:col-span-1">
                    <CommentThread comments={commentList} />

                    {canComment && hydrated && (
                        identity ? (
                            <CommentComposer
                                versionId={data.version.id}
                                authorName={identity.name}
                                authorEmail={identity.email}
                            />
                        ) : (
                            <ReviewerNameGate onSubmit={(name, email) => saveIdentity({ name, email })} />
                        )
                    )}
                </div>
            </div>
        </PageShell>
    );
}

// Deliberately no dashboard sidebar or auth chrome here — this is the
// one screen an external client sees, and it should feel like a clean
// share link, not a login-walled app.
function PageShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-paper">
            <header className="border-b border-line px-8 py-4">
                <p className="font-serif text-lg text-ink">Reelcue</p>
            </header>
            <main className="mx-auto max-w-6xl px-8 py-10">{children}</main>
        </div>
    );
}