import { Skeleton } from "@/components/ui/Skeleton";

export default function AccountLoading() {
    return (
        <div className="mx-auto max-w-md px-8 py-10">
            <Skeleton className="h-8 w-32" />
            <div className="mt-8 space-y-4 border-t border-line pt-6">
                {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-4 w-40" />
                ))}
            </div>
        </div>
    );
}