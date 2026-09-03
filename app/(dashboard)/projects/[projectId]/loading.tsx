import { Skeleton } from "@/components/ui/Skeleton";

export default function ProjectDetailLoading() {
    return (
        <div className="mx-auto max-w-4xl px-8 py-10">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="mt-3 h-8 w-64" />
            <Skeleton className="mt-2 h-4 w-32" />

            <div className="mt-8 divide-y divide-line border-t border-line">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between py-4">
                        <div className="space-y-1.5">
                            <Skeleton className="h-5 w-28" />
                            <Skeleton className="h-3 w-20" />
                        </div>
                        <Skeleton className="h-4 w-24" />
                    </div>
                ))}
            </div>
        </div>
    );
}