import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    _req: Request,
    { params }: { params: { versionId: string } }
) {
    const article = await prisma.article.findUnique({
        where: { versionId: params.versionId },
        include: { steps: { orderBy: { order: "asc" } } },
    });

    if (!article) {
        return NextResponse.json({ error: "No guide generated yet" }, { status: 404 });
    }

    return NextResponse.json(article);
}