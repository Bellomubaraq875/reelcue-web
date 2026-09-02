import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export type Comment = {
    id: string;
    versionId: string;
    authorName: string;
    authorEmail: string | null;
    timestampSeconds: number;
    body: string;
    parentId: string | null;
    createdAt: string;
};

async function fetchComments(versionId: string): Promise<Comment[]> {
    const res = await fetch(`/api/comments?versionId=${versionId}`);
    if (!res.ok) throw new Error("Failed to load comments");
    return res.json();
}

type NewComment = {
    versionId: string;
    authorName: string;
    authorEmail?: string;
    timestampSeconds: number;
    body: string;
    parentId?: string;
};

async function postComment(input: NewComment) {
    const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error("Failed to post comment");
    return res.json();
}

export function useComments(versionId: string) {
    return useQuery({
        queryKey: ["comments", versionId],
        queryFn: () => fetchComments(versionId),
        refetchInterval: 5000,
        enabled: !!versionId,
    });
}

export function usePostComment(versionId: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: postComment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", versionId] });
        },
    });
}