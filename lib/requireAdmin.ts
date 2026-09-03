import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Middleware already blocks non-admins from reaching /admin pages, but
// API routes are a separate trust boundary — a request can hit these
// endpoints directly, so each one checks the role itself rather than
// relying on the page around it.
export async function requireAdmin() {
    const session = await getServerSession(authOptions);
    const role = (session?.user as { role?: string } | undefined)?.role;

    if (!session || role !== "ADMIN") {
        return null;
    }
    return session;
}