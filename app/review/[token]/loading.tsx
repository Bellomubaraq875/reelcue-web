import { Skeleton } from "@/components/ui/Skeleton";

export default function PublicReviewLoading() {
    return (
        <div className="min-h-screen bg-paper">
            <header className="border-b border-line px-8 py-4">
                <p className="font-serif text-lg text-ink">Reelcue</p>
            </header>

            <main className="mx-auto max-w-6xl px-8 py-10">
                <Skeleton className="h-4 w-24" />

                <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <Skeleton className="aspect-video w-full rounded-none" />
                        <Skeleton className="mt-3 h-8 w-full" />
                    </div>

                    <div className="flex flex-col gap-3 lg:col-span-1">
                        {Array.from({ length: 2 }).map((_, i) => (
                            <Skeleton key={i} className="h-16 w-full" />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}