import { prisma } from "./prisma";

type EnqueueInput = {
  type: "TRANSCRIBE" | "SCRIPT_CLEANUP" | "CAPTIONS" | "SOP_GENERATION" | "DUBBING";
  versionId: string;
};


export async function enqueueJob({ type, versionId }: EnqueueInput) {
  return prisma.aIJob.create({
    data: { type, versionId, status: "PENDING" },
  });
}
