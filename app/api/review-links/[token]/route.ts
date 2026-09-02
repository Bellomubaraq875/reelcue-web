import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET(
  _req: NextRequest,
  { params }: { params: { token: string } }
) {
  const link = await prisma.reviewLink.findUnique({
    where: { token: params.token },
    include: {
      version: {
        include: { comments: true, captionTrack: true },
      },
    },
  });

  if (!link || link.revoked) {
    return NextResponse.json({ error: "Link not found" }, { status: 404 });
  }

  if (link.expiresAt && link.expiresAt < new Date()) {
    return NextResponse.json({ error: "Link expired" }, { status: 410 });
  }


  prisma.linkOpen.create({ data: { reviewLinkId: link.id } }).catch(() => {});

  return NextResponse.json({
    permission: link.permission,
    version: link.version,
  });
}
