import { prisma } from "./prisma";

type EnqueueInput = {
  type: "TRANSCRIBE" | "SCRIPT_CLEANUP" | "CAPTIONS" | "SOP_GENERATION" | "DUBBING";
  versionId: string;
};

// Fundamental version: writes a PENDING AIJob row that the worker polls.
// Swap this for a real queue client (Inngest, Trigger.dev, or Redis
// LPUSH via Upstash) once the worker service exists — the important
// part right now is that every job is tracked in Postgres regardless
// of which queue technology sits underneath, so the dashboard can show
// per-step progress.
export async function enqueueJob({ type, versionId }: EnqueueInput) {
  return prisma.aIJob.create({
    data: { type, versionId, status: "PENDING" },
  });
}
