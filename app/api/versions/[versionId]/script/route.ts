import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    _req: Request,
    { params }: { params: { versionId: string } }
) {
    const version = await prisma.videoVersion.findUnique({
        where: { id: params.versionId },
        select: { rawTranscript: true, cleanedScript: true },
    });

    if (!version) {
        return NextResponse.json({ error: "Version not found" }, { status: 404 });
    }

    return NextResponse.json(version);
}