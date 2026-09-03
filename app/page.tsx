import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-24">
      <p className="text-sm text-brass-600">Video review, without the overhead</p>

      <h1 className="mt-4 max-w-2xl text-5xl font-medium leading-[1.1] text-ink sm:text-6xl">
        Give notes on a cut the moment you see it.
      </h1>

      <p className="mt-6 max-w-md text-base leading-relaxed text-ink-500">
        Upload a video, share one link, and watch feedback land exactly where
        it happened — no downloads, no client accounts, no per-seat pricing.
      </p>

      <div className="mt-10 flex items-center gap-4">
        <Link
          href="/projects"
          className="rounded-md bg-ink px-5 py-2.5 text-sm font-medium text-paper-100 transition hover:bg-ink-800"
        >
          Start a project
        </Link>
        <Link
          href="#how-it-works"
          className="text-sm font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
        >
          See how it works
        </Link>
      </div>

      <div
        id="how-it-works"
        className="mt-24 grid grid-cols-1 gap-8 border-t border-line pt-10 sm:grid-cols-3"
      >
        <Step
          n="Upload"
          text="Drop in a video file or paste a YouTube link. Transcription and captions start automatically."
        />
        <Step
          n="Share"
          text="Send a single tokenized link. Reviewers watch and comment with no sign-up required."
        />
        <Step
          n="Approve"
          text="Comments land on the exact timestamp. Mark a cut approved and move to the next version."
        />
      </div>
    </main>
  );
}

function Step({ n, text }: { n: string; text: string }) {
  return (
    <div>
      <p className="font-serif text-lg text-ink">{n}</p>
      <p className="mt-2 text-sm leading-relaxed text-ink-500">{text}</p>
    </div>
  );
}