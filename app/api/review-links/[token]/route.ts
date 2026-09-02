import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// The only unauthenticated read path in the app. Every check here
// matters — this is what stands between a shared link and someone
// who shouldn't have access.
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

  // Analytics — fire and forget, don't block the response on it.
  prisma.linkOpen.create({ data: { reviewLinkId: link.id } }).catch(() => {});

  return NextResponse.json({
    permission: link.permission,
    version: link.version,
  });
}
