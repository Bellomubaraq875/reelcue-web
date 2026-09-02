import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { enqueueJob } from "@/lib/queue";

// Called by the storage provider once an upload finishes. This is the
// trigger point for the whole async pipeline: create the DB record,
// then hand off to the worker via the queue.
export async function POST(req: NextRequest) {
  // TODO: verify the request actually came from your storage provider
  // (signature/HMAC check) before trusting the body.
  const { projectId, storageUrl, versionNumber } = await req.json();

  if (!projectId || !storageUrl) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const version = await prisma.videoVersion.create({
    data: {
      projectId,
      versionNumber: versionNumber ?? 1,
      sourceType: "UPLOAD",
      storageUrl,
      status: "PROCESSING",
    },
  });

  // Kick off transcription first — script cleanup, captions, and SOP
  // generation all depend on its output (see content pipeline).
  await enqueueJob({ type: "TRANSCRIBE", versionId: version.id });

  return NextResponse.json({ versionId: version.id }, { status: 201 });
}
