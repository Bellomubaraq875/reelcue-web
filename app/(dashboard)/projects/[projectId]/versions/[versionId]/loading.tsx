import { Skeleton } from "@/components/ui/Skeleton";

export default function VersionReviewLoading() {
    return (
        <div className="mx-auto max-w-6xl px-8 py-10">
            <Skeleton className="h-4 w-24" />

            <div className="mt-3 flex items-center justify-between">
                <Skeleton className="h-8 w-40" />
                <div className="flex gap-2">
                    <Skeleton className="h-9 w-32" />
                    <Skeleton className="h-9 w-24" />
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <Skeleton className="aspect-video w-full rounded-none" />
                    <Skeleton className="mt-3 h-8 w-full" />
                </div>

                <div className="flex flex-col gap-4 lg:col-span-1">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="border border-line p-3">
                            <div className="flex items-start gap-2">
                                <Skeleton className="h-5 w-10 shrink-0" />
                                <div className="w-full space-y-1.5">
                                    <Skeleton className="h-3 w-1/3" />
                                    <Skeleton className="h-3 w-full" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}