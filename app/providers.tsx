"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: { staleTime: 10_000, refetchOnWindowFocus: false },
                },
            })
    );

    // SessionProvider makes useSession() available client-side, so pages
    // can read the real signed-in user instead of a placeholder name.
    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </SessionProvider>
    );
}