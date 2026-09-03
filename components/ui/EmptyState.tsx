type EmptyStateProps = {
    title: string;
    description: string;
    action?: React.ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-start gap-3 rounded-lg border border-dashed border-line px-6 py-12">
            <h3 className="text-lg font-medium text-ink">{title}</h3>
            <p className="max-w-sm text-sm text-ink-500">{description}</p>
            {action}
        </div>
    );
}