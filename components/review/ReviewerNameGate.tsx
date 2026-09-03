"use client";

import { useState } from "react";

type ReviewerNameGateProps = {
    onSubmit: (name: string, email?: string) => void;
};

// Shown once, in place of the comment composer, until the reviewer
// identifies themselves. Kept to a single required field to avoid
// adding friction to an otherwise no-signup flow.
export function ReviewerNameGate({ onSubmit }: ReviewerNameGateProps) {
    const [name, setName] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!name.trim()) return;
        onSubmit(name.trim());
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 border border-line bg-paper-100 p-4"
        >
            <label className="text-sm text-ink-500">
                Enter your name to leave feedback
            </label>
            <div className="flex gap-2">
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="flex-1 border border-line bg-paper-100 px-3 py-2 text-sm text-ink outline-none focus:border-ink"
                />
                <button
                    type="submit"
                    disabled={!name.trim()}
                    className="bg-ink px-4 py-2 text-sm font-medium text-paper-100 transition hover:bg-ink-800 disabled:opacity-40"
                >
                    Continue
                </button>
            </div>
        </form>
    );
}