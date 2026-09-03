import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    const versionId = req.nextUrl.searchParams.get("versionId");
    if (!versionId) {
        return NextResponse.json({ error: "versionId is required" }, { status: 400 });
    }

    const comments = await prisma.comment.findMany({
        where: { versionId },
        orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(comments);
}

export async function POST(req: NextRequest) {
    const { versionId, authorName, authorEmail, timestampSeconds, body, parentId } =
        await req.json();

    if (!versionId || !authorName || body === undefined || timestampSeconds === undefined) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const comment = await prisma.comment.create({
        data: { versionId, authorName, authorEmail, timestampSeconds, body, parentId },
    });

    return NextResponse.json(comment, { status: 201 });
}