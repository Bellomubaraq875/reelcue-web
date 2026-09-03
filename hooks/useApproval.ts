import { useMutation, useQueryClient } from "@tanstack/react-query";

export type ApprovalStatus = "PENDING" | "IN_REVIEW" | "APPROVED" | "CHANGES_REQUESTED";

async function updateApproval(versionId: string, status: ApprovalStatus) {
    const res = await fetch(`/api/versions/${versionId}/approval`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error("Failed to update approval status");
    return res.json();
}

export function useUpdateApproval(versionId: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (status: ApprovalStatus) => updateApproval(versionId, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["version", versionId] });
        },
    });
}