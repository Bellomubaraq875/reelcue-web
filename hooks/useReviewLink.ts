import { useQuery } from "@tanstack/react-query";
import type { Comment } from "./useComments";

export type ReviewLinkPermission = "VIEW" | "COMMENT" | "APPROVE";

export type ReviewLinkData = {
    permission: ReviewLinkPermission;
    version: {
        id: string;
        versionNumber: number;
        storageUrl: string | null;
        comments: Comment[];
    };
};

// Distinguishes "link doesn't exist" from "link expired" so the page can
// show the right message instead of a generic error.
export class ReviewLinkError extends Error {
    status: number;
    constructor(status: number) {
        super(status === 410 ? "expired" : "not_found");
        this.status = status;
    }
}

async function fetchReviewLink(token: string): Promise<ReviewLinkData> {
    const res = await fetch(`/api/review-links/${token}`);
    if (!res.ok) throw new ReviewLinkError(res.status);
    return res.json();
}

export function useReviewLink(token: string) {
    return useQuery({
        queryKey: ["review-link", token],
        queryFn: () => fetchReviewLink(token),
        enabled: !!token,
        retry: false, // a 404/410 won't resolve on retry
    });
}