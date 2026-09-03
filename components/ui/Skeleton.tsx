type SkeletonProps = {
    className?: string;
};

export function Skeleton({ className = "" }: SkeletonProps) {
    return (
        <div
            className={`animate-pulse rounded-md bg-ink-700/10 ${className}`}
            aria-hidden="true"
        />
    );
}