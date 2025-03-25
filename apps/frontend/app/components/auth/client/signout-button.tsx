"use client"
import { signOut } from "next-auth/react"

export function SignOut() {
    return <button
        className="cursor-pointer"
        onClick={() => signOut()}>
        Sign Out
    </button>
}