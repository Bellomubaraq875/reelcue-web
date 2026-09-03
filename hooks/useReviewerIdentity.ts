import { useEffect, useState } from "react";

type ReviewerIdentity = { name: string; email?: string };

// External reviewers never sign in, so we ask for a name once per browser
// tab and remember it — good enough for audit trails without adding an
// account system. Scoped per-token so different review links don't collide.
export function useReviewerIdentity(token: string) {
    const storageKey = `reelcue:reviewer:${token}`;
    const [identity, setIdentity] = useState<ReviewerIdentity | null>(null);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        const stored = sessionStorage.getItem(storageKey);
        if (stored) setIdentity(JSON.parse(stored));
        setHydrated(true);
    }, [storageKey]);

    function saveIdentity(next: ReviewerIdentity) {
        sessionStorage.setItem(storageKey, JSON.stringify(next));
        setIdentity(next);
    }

    return { identity, hydrated, saveIdentity };
}