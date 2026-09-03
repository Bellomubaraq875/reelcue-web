import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    _req: NextRequest,
    { params }: { params: { projectId: string } }
) {
    const project = await prisma.project.findUnique({
        where: { id: params.projectId },
        include: { versions: { orderBy: { versionNumber: "desc" } } },
    });

    if (!project) {
        return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
}