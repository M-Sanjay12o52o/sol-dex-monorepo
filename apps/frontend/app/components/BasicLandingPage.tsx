"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Activity, Database, Settings, Table, User } from "lucide-react";
import Link from "next/link";

const BasicLandingPage = () => {
    const { data: session, status } = useSession();

    if (status === "loading") return <div>Loading...</div>

    return (
        session?.user && (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
                {/* Welcome User Section */}
                <div className="text-center mb-12 -mt-24">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Welcome Back, {session?.user.name}
                    </h1>
                    <p className="text-lg text-gray-600 mt-2">
                        Manage your blockchain data indexing with ease.
                    </p>
                </div>

                {/* Quick Stats Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                    <div className="flex items-center justify-center bg-white p-6 rounded-lg shadow-md">
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-gray-800">
                                Current Indexing
                            </h3>
                            <p className="text-3xl text-indigo-600 mt-2">10GB</p>
                            <p className="text-sm text-gray-500">Data currently indexed</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center bg-white p-6 rounded-lg shadow-md">
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-gray-800">
                                Pending Tasks
                            </h3>
                            <p className="text-3xl text-yellow-500 mt-2">3</p>
                            <p className="text-sm text-gray-500">
                                Indexing tasks waiting to be completed
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center bg-white p-6 rounded-lg shadow-md">
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-gray-800">
                                Completed Tasks
                            </h3>
                            <p className="text-3xl text-green-500 mt-2">120</p>
                            <p className="text-sm text-gray-500">
                                Successfully indexed tasks
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Action Buttons */}
                <div className="flex flex-wrap justify-center gap-4">
                    <Button asChild variant="outline" className="flex items-center gap-2">
                        <Link href="/connect">
                            <Database className="h-5 w-5 text-indigo-600" />
                            Connect Database
                        </Link>
                    </Button>

                    <Button asChild variant="outline" className="flex items-center gap-2">
                        <Link href="/options">
                            <Settings className="h-5 w-5 text-indigo-600" />
                            Select Options
                        </Link>
                    </Button>

                    <Button asChild variant="outline" className="flex items-center gap-2">
                        <Link href="/index">
                            <Activity className="h-5 w-5 text-indigo-600" />
                            Indexing
                        </Link>
                    </Button>

                    <Button asChild variant="outline" className="flex items-center gap-2">
                        <Link href="/data">
                            <Table className="h-5 w-5 text-indigo-600" />
                            View Data
                        </Link>
                    </Button>

                    {/* User Profile/Settings Button */}
                    <Button asChild variant="outline" className="flex items-center gap-2">
                        <Link href="/profile">
                            <User className="h-5 w-5 text-indigo-600" />
                            Profile & Settings
                        </Link>
                    </Button>
                </div>

                {/* Additional Info Section */}
                <div className="mt-12 text-center text-gray-600">
                    <p className="text-sm">
                        Powered by Helius Webhooks - Seamlessly integrate blockchain data.
                    </p>
                    <p className="text-xs mt-2">
                        © 2025 sol-dex. All rights reserved.
                    </p>
                </div>
            </div>
        )
    )
}

export default BasicLandingPage;