import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { enqueueJob } from "@/lib/queue";

export async function POST(req: NextRequest) {
  // TODO: verify the request actually came from your storage provider
  // (signature/HMAC check) before trusting the body.
  const { projectId, storageUrl } = await req.json();

  if (!projectId || !storageUrl) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Version number is always derived from existing versions, never
  // trusted from the client — otherwise a second upload with no
  // explicit number would collide with version 1 on the unique constraint.
  const latest = await prisma.videoVersion.findFirst({
    where: { projectId },
    orderBy: { versionNumber: "desc" },
    select: { versionNumber: true },
  });
  const versionNumber = (latest?.versionNumber ?? 0) + 1;

  const version = await prisma.videoVersion.create({
    data: {
      projectId,
      versionNumber,
      sourceType: "UPLOAD",
      storageUrl,
      status: "PROCESSING",
    },
  });

  await enqueueJob({ type: "TRANSCRIBE", versionId: version.id });

  return NextResponse.json({ versionId: version.id }, { status: 201 });
}