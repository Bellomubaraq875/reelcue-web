import { Skeleton } from "@/components/ui/Skeleton";

export default function CaptionsLoading() {
    return (
        <div className="mx-auto max-w-5xl px-8 py-10">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="mt-2 h-8 w-56" />
            <Skeleton className="mt-6 h-9 w-full" />
            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
                <Skeleton className="aspect-video w-full rounded-none lg:col-span-2" />
                <div className="space-y-3 lg:col-span-1">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="h-10 w-full" />
                    ))}
                </div>
            </div>
        </div>
    );
}