import NextAuth from "next-auth";
import authConfig from "./auth.config";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma"
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig,
    providers: [Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }), GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
    })],
    callbacks: {
        // TODO: Make user signin with the same oauth as first time.
        async redirect({ url, baseUrl }) {
            return baseUrl;
        }
    },
    pages: {
        signIn: "/",
        // TODO: Create signout and error page
        signOut: "/signout",
        error: "error"
    },
})