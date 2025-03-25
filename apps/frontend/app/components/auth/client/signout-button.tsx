"use client"
import { signOut } from "next-auth/react"
import { redirect } from "next/navigation";

export function SignOut() {
    const handleSignout = () => {
        console.log("hello from handleSignout");
        signOut();
        redirect("/")
    }

    return <button
        className="cursor-pointer"
        onClick={handleSignout}>
        Sign Out
    </button>
}