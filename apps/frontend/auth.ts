import NextAuth from "next-auth";
import authConfig from "./auth.config";

// import { PrismaClient } from "@prisma/client/extension";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma"
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { config } from "process";

// const prisma = new PrismaClient();

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
    pages: {
        signIn: "/login",
        // TODO: Create signout and error page
        signOut: "/signout",
        error: "error"
    },
})

// For sovling the edge issue

// import { PrismaAdapter } from "@auth/prisma-adapter";
// import NextAuth from "next-auth";
// import GitHub from "next-auth/providers/github";
// import Google from "next-auth/providers/google";
// import { prisma } from "./prisma";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//     adapter: PrismaAdapter(prisma),
//     providers: [Google({
//         clientId: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }), GitHub({
//         clientId: process.env.GITHUB_CLIENT_ID,
//         clientSecret: process.env.GITHUB_CLIENT_SECRET,
//     })],
// })