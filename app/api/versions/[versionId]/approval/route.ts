import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const VALID_STATUSES = ["PENDING", "IN_REVIEW", "APPROVED", "CHANGES_REQUESTED"];

export async function PATCH(
    req: NextRequest,
    { params }: { params: { versionId: string } }
) {
    const { status } = await req.json();

    if (!VALID_STATUSES.includes(status)) {
        return NextResponse.json({ error: "Invalid approval status" }, { status: 400 });
    }

    const version = await prisma.videoVersion.update({
        where: { id: params.versionId },
        data: { approvalStatus: status },
    });

    return NextResponse.json(version);
}