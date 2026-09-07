"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateProject } from "@/hooks/useProjects";

export default function NewProjectPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [clientName, setClientName] = useState("");
    const { mutate: createProject, isPending, error } = useCreateProject();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!name.trim()) return;

        createProject(
            { name: name.trim(), clientName: clientName.trim() || undefined },
            { onSuccess: (project) => router.push(`/projects/${project.id}`) }
        );
    }

    return (
        <div className="mx-auto max-w-md px-8 py-10">
            <h1 className="text-2xl font-medium text-ink">New project</h1>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                <div>
                    <label className="text-sm text-ink-500">Project name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Q4 product launch video"
                        required
                        className="mt-1 w-full border border-line bg-paper-100 px-3 py-2 text-sm text-ink outline-none focus:border-ink"
                    />
                </div>

                <div>
                    <label className="text-sm text-ink-500">Client name (optional)</label>
                    <input
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Acme Inc."
                        className="mt-1 w-full border border-line bg-paper-100 px-3 py-2 text-sm text-ink outline-none focus:border-ink"
                    />
                </div>

                {error && <p className="text-sm text-rust">{error.message}</p>}

                <button
                    type="submit"
                    disabled={isPending || !name.trim()}
                    className="self-start bg-ink px-4 py-2 text-sm font-medium text-paper-100 transition hover:bg-ink-800 disabled:opacity-40"
                >
                    {isPending ? "Creating…" : "Create project"}
                </button>
            </form>
        </div>
    );
}