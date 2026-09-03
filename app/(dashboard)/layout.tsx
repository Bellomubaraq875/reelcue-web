import Link from "next/link";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen">
            <aside className="flex w-56 shrink-0 flex-col justify-between bg-ink px-5 py-6 text-paper">
                <div>
                    <Link href="/" className="font-serif text-xl">
                        Reelcue
                    </Link>
                    <nav className="mt-10 flex flex-col gap-1 text-sm">
                        <SidebarLink href="/projects">Projects</SidebarLink>
                        <SidebarLink href="/settings/account">Settings</SidebarLink>
                    </nav>
                </div>

                <p className="text-xs text-paper/50">Signed in as creator</p>
            </aside>

            <div className="flex-1 bg-paper">{children}</div>
        </div>
    );
}

function SidebarLink({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    return (
        <Link
            href={href}
            className="rounded-md px-2.5 py-1.5 text-paper/80 transition hover:bg-ink-700 hover:text-paper"
        >
            {children}
        </Link>
    );
}