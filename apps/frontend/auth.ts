import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

console.log("google client id: ", process.env.GOOGLE_CLIENT_ID,
    "google client secret: ", process.env.GOOGLE_CLIENT_SECRET,
    "github client id: ", process.env.GITHUB_CLIENT_ID,
    "github client secret: ", process.env.GITHUB_CLIENT_SECRET,)

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }), GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
    })],
})