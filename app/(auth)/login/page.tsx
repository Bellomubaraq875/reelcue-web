"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        // redirect: false keeps us on this page to show the "check your
        // email" confirmation instead of NextAuth's default verify-request page.
        await signIn("email", { email, redirect: false, callbackUrl: "/projects" });
        setSent(true);
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-paper px-6">
            <div className="w-full max-w-sm">
                <p className="font-serif text-2xl text-ink">Reelcue</p>

                {sent ? (
                    <p className="mt-6 text-sm text-ink-500">
                        Check <span className="text-ink">{email}</span> for a sign-in link.
                    </p>
                ) : (
                    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
                        <label className="text-sm text-ink-500">
                            Sign in with your email — no password needed.
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@company.com"
                            className="border border-line bg-paper-100 px-3 py-2 text-sm text-ink outline-none focus:border-ink"
                        />
                        <button
                            type="submit"
                            className="bg-ink px-4 py-2 text-sm font-medium text-paper-100 transition hover:bg-ink-800"
                        >
                            Send sign-in link
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}