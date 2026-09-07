import { Skeleton } from "@/components/ui/Skeleton";

export default function KnowledgeBaseLoading() {
    return (
        <div className="mx-auto max-w-3xl px-8 py-10">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="mt-2 h-8 w-56" />
            <Skeleton className="mt-6 h-9 w-full" />
            <div className="mt-8 space-y-6">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex gap-4">
                        <Skeleton className="h-7 w-7 shrink-0" />
                        <Skeleton className="h-12 w-full" />
                    </div>
                ))}
            </div>
        </div>
    );
}