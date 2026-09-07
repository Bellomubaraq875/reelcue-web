import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    _req: Request,
    { params }: { params: { versionId: string } }
) {
    const track = await prisma.captionTrack.findUnique({
        where: { versionId: params.versionId },
    });

    if (!track) {
        return NextResponse.json({ error: "No captions generated yet" }, { status: 404 });
    }

    return NextResponse.json(track);
}