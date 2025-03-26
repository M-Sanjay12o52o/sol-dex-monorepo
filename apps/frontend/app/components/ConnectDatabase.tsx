"use client"

import React from "react";
import PostgresForm from "@/components/PostgresForm";
import { useSession } from "next-auth/react";

const ConnectDatabase: React.FC = () => {
    const { data: session, status } = useSession();

    if (status === "loading") return <div>Loading...</div>

    return (
        session?.user && (
            <div className="min-h-screen w-full bg-background flex flex-col">
                <main className="flex-1 flex flex-col items-center justify-center p-6">
                    <div className="max-w-2xl w-full space-y-6">
                        <PostgresForm />
                    </div>
                </main>
            </div>
        )
    );
};

export default ConnectDatabase;
