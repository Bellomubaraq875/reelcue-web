import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    _req: NextRequest,
    { params }: { params: { versionId: string } }
) {
    const version = await prisma.videoVersion.findUnique({
        where: { id: params.versionId },
        include: { project: { select: { name: true } } },
    });

    if (!version) {
        return NextResponse.json({ error: "Version not found" }, { status: 404 });
    }

    return NextResponse.json({
        id: version.id,
        versionNumber: version.versionNumber,
        status: version.status,
        approvalStatus: version.approvalStatus,
        storageUrl: version.storageUrl,
        projectName: version.project.name,
    });
}