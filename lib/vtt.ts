export type Cue = { start: number; end: number; text: string };

// Minimal WebVTT parser — handles the cue timing and text lines that
// the caption pipeline generates. Doesn't attempt styling/position
// cue settings, since caption appearance is driven by stylePreset instead.
export function parseVtt(vtt: string): Cue[] {
    const cues: Cue[] = [];
    const blocks = vtt.replace(/^WEBVTT.*\n/, "").split(/\n\s*\n/);

    for (const block of blocks) {
        const lines = block.trim().split("\n");
        const timingLine = lines.find((l) => l.includes("-->"));
        if (!timingLine) continue;

        const [startRaw, endRaw] = timingLine.split("-->").map((s) => s.trim());
        const text = lines.slice(lines.indexOf(timingLine) + 1).join(" ");

        cues.push({ start: toSeconds(startRaw), end: toSeconds(endRaw), text });
    }

    return cues;
}

function toSeconds(timestamp: string): number {
    const [h, m, s] = timestamp.split(":");
    return Number(h) * 3600 + Number(m) * 60 + Number(s.replace(",", "."));
}