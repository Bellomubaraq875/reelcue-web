import { Skeleton } from "@/components/ui/Skeleton";

export default function ScriptLoading() {
    return (
        <div className="mx-auto max-w-5xl px-8 py-10">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="mt-2 h-8 w-56" />
            <Skeleton className="mt-6 h-9 w-full" />
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                ))}
            </div>
        </div>
    );
}