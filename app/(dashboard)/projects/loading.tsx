import { Skeleton } from "@/components/ui/Skeleton";

export default function ProjectsLoading() {
    return (
        <div className="mx-auto max-w-4xl px-8 py-10">
            <Skeleton className="h-8 w-40" />

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="rounded-lg border border-line p-4">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="mt-2 h-3 w-1/2" />
                        <Skeleton className="mt-4 h-3 w-1/4" />
                    </div>
                ))}
            </div>
        </div>
    );
}