import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    const versionId = req.nextUrl.searchParams.get("versionId");
    if (!versionId) {
        return NextResponse.json({ error: "versionId is required" }, { status: 400 });
    }

    const jobs = await prisma.aIJob.findMany({
        where: { versionId },
        select: { type: true, status: true },
        orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(jobs);
}