import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { enqueueJob } from "@/lib/queue";


export async function POST(req: NextRequest) {

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

  await enqueueJob({ type: "TRANSCRIBE", versionId: version.id });

  return NextResponse.json({ versionId: version.id }, { status: 201 });
}
