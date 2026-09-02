import type { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

// Fundamental auth config — swap/add providers (Google, GitHub) as needed.
// Email magic-link keeps signup frictionless for creators; external
// reviewers never touch this — they use tokenized review links instead.
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  session: {
    strategy: "database",
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        (session.user as { id: string; role: string }).id = user.id;
        (session.user as { id: string; role: string }).role =
          (user as { role?: string }).role ?? "CREATOR";
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
