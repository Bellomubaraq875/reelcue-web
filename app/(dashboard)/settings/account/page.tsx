"use client";

import { useSession, signOut } from "next-auth/react";

export default function AccountSettingsPage() {
    const { data: session } = useSession();

    return (
        <div className="mx-auto max-w-md px-8 py-10">
            <h1 className="text-2xl font-medium text-ink">Account</h1>

            <div className="mt-8 space-y-4 border-t border-line pt-6">
                <div>
                    <p className="text-xs text-ink-500">Name</p>
                    <p className="mt-0.5 text-sm text-ink">{session?.user?.name ?? "—"}</p>
                </div>
                <div>
                    <p className="text-xs text-ink-500">Email</p>
                    <p className="mt-0.5 text-sm text-ink">{session?.user?.email ?? "—"}</p>
                </div>
                <div>
                    <p className="text-xs text-ink-500">Role</p>
                    <p className="mt-0.5 text-sm text-ink">
                        {(session?.user as { role?: string })?.role ?? "CREATOR"}
                    </p>
                </div>
            </div>

            <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="mt-8 border border-line px-4 py-2 text-sm font-medium text-ink transition hover:border-rust hover:text-rust"
            >
                Sign out
            </button>
        </div>
    );
}