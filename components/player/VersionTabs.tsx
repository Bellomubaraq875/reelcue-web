"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type VersionTabsProps = {
    projectId: string;
    versionId: string;
};

const TABS = [
    { segment: "", label: "Review" },
    { segment: "script", label: "Script" },
    { segment: "captions", label: "Captions" },
    { segment: "knowledge-base", label: "Knowledge base" },
];

export function VersionTabs({ projectId, versionId }: VersionTabsProps) {
    const pathname = usePathname();
    const base = `/projects/${projectId}/versions/${versionId}`;

    return (
        <div className="flex gap-6 border-b border-line">
            {TABS.map((tab) => {
                const href = tab.segment ? `${base}/${tab.segment}` : base;
                const isActive = pathname === href;
                return (
                    <Link
                        key={tab.segment}
                        href={href}
                        className={`border-b-2 pb-3 text-sm font-medium transition ${isActive
                                ? "border-brass text-ink"
                                : "border-transparent text-ink-500 hover:text-ink"
                            }`}
                    >
                        {tab.label}
                    </Link>
                );
            })}
        </div>
    );
}