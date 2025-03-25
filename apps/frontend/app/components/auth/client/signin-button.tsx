"use client"
import { signIn } from "next-auth/react"

export function SignIn() {
    return (
        <div>
            <button onClick={() => signIn("github", { redirectTo: "/dashboard" })}>
                Sign In Github
            </button>
            <button onClick={() => signIn("google", { redirectTo: "/dashboard" })}>
                Sign In with Google
            </button>
        </div>
    )
}