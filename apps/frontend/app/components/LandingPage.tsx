"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
    Database,
    Layers,
    Rocket,
    Shield,
    ArrowRight,
    Zap,
    BarChart3,
    Globe,
    Code,
    Server,
    Settings,
    Activity,
    Table,
    User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const LandingPage: React.FC = () => {
    const router = useRouter();
    const { data: session, status } = useSession();

    if (status === "loading") return <div>Loading....</div>

    return session ? (
        <div>
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
                {/* Welcome User Section */}
                <div className="text-center mb-12 -mt-24">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Welcome Back, User!
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
        </div>
    ) : (
        <>
            <div>
                <div className="min-h-screen bg-background flex flex-col">
                    {/* Hero Section */}
                    <div className="relative isolate overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background/5 z-0"></div>
                        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 relative z-10">
                            <div className="flex flex-col md:flex-row gap-12 items-center">
                                <div className="flex-1 space-y-6">
                                    <div className="space-y-2">
                                        <Badge className="bg-primary/20 hover:bg-primary/30 text-primary py-1 px-3 rounded-full text-sm font-medium animate-fade-in">
                                            Blockchain Data Indexer
                                        </Badge>
                                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground animate-fade-in">
                                            Transform Blockchain Data Into Actionable Insights
                                        </h1>
                                        <p className="text-xl text-muted-foreground max-w-xl animate-fade-in">
                                            Index, query, and analyze blockchain data directly into
                                            your PostgreSQL database without managing complex
                                            infrastructure.
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-4 animate-fade-in">
                                        <Button
                                            size="lg"
                                            onClick={() => router.push("/signup")}
                                            className="group cursor-pointer"
                                        >
                                            Get Started
                                            <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            onClick={() => router.push("/signin")}
                                            className="cursor-pointer w-32"
                                        >
                                            Sign In
                                        </Button>
                                    </div>

                                    <div className="flex items-center gap-4 text-sm text-muted-foreground animate-fade-in">
                                        <div className="flex items-center gap-1">
                                            <Shield className="h-4 w-4" />
                                            <span>Secure</span>
                                        </div>
                                        <div className="h-1 w-1 rounded-full bg-muted-foreground/30"></div>
                                        <div className="flex items-center gap-1">
                                            <Zap className="h-4 w-4" />
                                            <span>High Performance</span>
                                        </div>
                                        <div className="h-1 w-1 rounded-full bg-muted-foreground/30"></div>
                                        <div className="flex items-center gap-1">
                                            <Database className="h-4 w-4" />
                                            <span>PostgreSQL Compatible</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 relative">
                                    <div className="relative w-full aspect-square max-w-md mx-auto">
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl transform rotate-3 scale-95"></div>
                                        <div className="absolute inset-0 border border-primary/20 bg-card rounded-2xl shadow-xl backdrop-blur-sm transform -rotate-3 scale-95"></div>
                                        <div className="relative h-full w-full bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
                                            <div className="p-6">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <Database className="h-5 w-5 text-primary" />
                                                    <div className="text-lg font-medium">
                                                        Blockchain Data
                                                    </div>
                                                </div>
                                                <div className="space-y-3">
                                                    <div className="h-6 bg-muted/70 rounded-md animate-pulse-soft"></div>
                                                    <div className="h-6 bg-muted/70 rounded-md w-4/5 animate-pulse-soft"></div>
                                                    <div className="h-6 bg-muted/70 rounded-md animate-pulse-soft"></div>
                                                    <div className="h-6 bg-muted/70 rounded-md w-3/4 animate-pulse-soft"></div>
                                                </div>
                                                <Separator className="my-4" />
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="p-3 bg-accent rounded-lg">
                                                        <div className="font-medium">Transactions</div>
                                                        <div className="text-2xl font-bold">12.4k</div>
                                                    </div>
                                                    <div className="p-3 bg-accent rounded-lg">
                                                        <div className="font-medium">Blocks</div>
                                                        <div className="text-2xl font-bold">1,893</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="bg-card border-y border-border">
                        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold tracking-tight">
                                    Powerful Features for Blockchain Data Analysis
                                </h2>
                                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                                    Our platform simplifies blockchain data indexing with an
                                    intuitive interface and powerful backend.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <Card className="bg-background hover:shadow-md transition-shadow border-border">
                                    <CardContent className="p-6 space-y-4">
                                        <div className="p-3 bg-primary/10 rounded-lg w-fit">
                                            <Server className="h-6 w-6 text-primary" />
                                        </div>
                                        <h3 className="text-xl font-semibold">
                                            PostgreSQL Integration
                                        </h3>
                                        <p className="text-muted-foreground">
                                            Connect directly to your existing PostgreSQL database
                                            without any additional infrastructure.
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="bg-background hover:shadow-md transition-shadow border-border">
                                    <CardContent className="p-6 space-y-4">
                                        <div className="p-3 bg-primary/10 rounded-lg w-fit">
                                            <Layers className="h-6 w-6 text-primary" />
                                        </div>
                                        <h3 className="text-xl font-semibold">
                                            Flexible Data Indexing
                                        </h3>
                                        <p className="text-muted-foreground">
                                            Choose exactly which blockchain data you want to index
                                            based on your application's needs.
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="bg-background hover:shadow-md transition-shadow border-border">
                                    <CardContent className="p-6 space-y-4">
                                        <div className="p-3 bg-primary/10 rounded-lg w-fit">
                                            <BarChart3 className="h-6 w-6 text-primary" />
                                        </div>
                                        <h3 className="text-xl font-semibold">
                                            Real-time Analytics
                                        </h3>
                                        <p className="text-muted-foreground">
                                            Monitor your indexed data with built-in analytics and
                                            visualizations for deeper insights.
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="bg-background hover:shadow-md transition-shadow border-border">
                                    <CardContent className="p-6 space-y-4">
                                        <div className="p-3 bg-primary/10 rounded-lg w-fit">
                                            <Globe className="h-6 w-6 text-primary" />
                                        </div>
                                        <h3 className="text-xl font-semibold">
                                            Decentralized Access
                                        </h3>
                                        <p className="text-muted-foreground">
                                            Access blockchain data through decentralized nodes to
                                            ensure reliability and uptime.
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="bg-background hover:shadow-md transition-shadow border-border">
                                    <CardContent className="p-6 space-y-4">
                                        <div className="p-3 bg-primary/10 rounded-lg w-fit">
                                            <Code className="h-6 w-6 text-primary" />
                                        </div>
                                        <h3 className="text-xl font-semibold">Developer API</h3>
                                        <p className="text-muted-foreground">
                                            Integrate indexed blockchain data into your applications
                                            with our comprehensive API.
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="bg-background hover:shadow-md transition-shadow border-border">
                                    <CardContent className="p-6 space-y-4">
                                        <div className="p-3 bg-primary/10 rounded-lg w-fit">
                                            <Rocket className="h-6 w-6 text-primary" />
                                        </div>
                                        <h3 className="text-xl font-semibold">Rapid Deployment</h3>
                                        <p className="text-muted-foreground">
                                            Set up and start indexing in minutes with our simplified
                                            onboarding process.
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>

                    {/* How It Works Section */}
                    <div className="bg-background">
                        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl font-bold tracking-tight">
                                    How It Works
                                </h2>
                                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                                    Get started in just a few simple steps
                                </p>
                            </div>

                            <div className="relative">
                                <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-border hidden md:block"></div>

                                <div className="space-y-12 relative">
                                    <div className="flex flex-col md:flex-row gap-8 items-center">
                                        <div className="md:w-1/2 md:text-right space-y-4 md:pr-8">
                                            <div className="bg-primary/10 text-primary font-semibold px-4 py-1 rounded-full inline-block">
                                                Step 1
                                            </div>
                                            <h3 className="text-2xl font-bold">
                                                Connect Your Database
                                            </h3>
                                            <p className="text-muted-foreground max-w-md md:ml-auto">
                                                Provide your PostgreSQL connection details to securely
                                                connect your database to our platform.
                                            </p>
                                        </div>
                                        <div className="relative flex items-center justify-center md:w-1/2 md:pl-8">
                                            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold z-10">
                                                1
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
                                        <div className="md:w-1/2 md:text-left space-y-4 md:pl-8">
                                            <div className="bg-primary/10 text-primary font-semibold px-4 py-1 rounded-full inline-block">
                                                Step 2
                                            </div>
                                            <h3 className="text-2xl font-bold">
                                                Select Indexing Options
                                            </h3>
                                            <p className="text-muted-foreground max-w-md">
                                                Choose which blockchain data you want to index based on
                                                your specific requirements.
                                            </p>
                                        </div>
                                        <div className="relative flex items-center justify-center md:w-1/2 md:pr-8">
                                            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold z-10">
                                                2
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-8 items-center">
                                        <div className="md:w-1/2 md:text-right space-y-4 md:pr-8">
                                            <div className="bg-primary/10 text-primary font-semibold px-4 py-1 rounded-full inline-block">
                                                Step 3
                                            </div>
                                            <h3 className="text-2xl font-bold">
                                                Monitor Indexing Status
                                            </h3>
                                            <p className="text-muted-foreground max-w-md md:ml-auto">
                                                Track the progress of your data indexing in real-time
                                                through our intuitive dashboard.
                                            </p>
                                        </div>
                                        <div className="relative flex items-center justify-center md:w-1/2 md:pl-8">
                                            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold z-10">
                                                3
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
                                        <div className="md:w-1/2 md:text-left space-y-4 md:pl-8">
                                            <div className="bg-primary/10 text-primary font-semibold px-4 py-1 rounded-full inline-block">
                                                Step 4
                                            </div>
                                            <h3 className="text-2xl font-bold">Access Your Data</h3>
                                            <p className="text-muted-foreground max-w-md">
                                                Query and analyze the indexed blockchain data directly
                                                from your PostgreSQL database.
                                            </p>
                                        </div>
                                        <div className="relative flex items-center justify-center md:w-1/2 md:pr-8">
                                            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold z-10">
                                                4
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="bg-card border-t border-border">
                        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 flex flex-col items-center text-center">
                            <h2 className="text-3xl font-bold tracking-tight mb-6">
                                Ready to Transform Blockchain Data?
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
                                Start indexing blockchain data into your PostgreSQL database
                                today. No complex infrastructure, no maintenance headaches.
                            </p>
                            <Button
                                size="lg"
                                onClick={() => router.push("/signup")}
                                className="group cursor-pointer"
                            >
                                Get Started for Free
                                <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <p className="text-sm text-muted-foreground mt-4">
                                No credit card required. Powered by Helius webhooks.
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="bg-background border-t border-border py-12 px-6">
                        <div className="mx-auto max-w-7xl">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <Database className="h-6 w-6 text-primary" />
                                    <span className="text-xl font-medium">BlockIndex</span>
                                </div>
                                <div className="flex flex-wrap gap-4 md:gap-8 justify-center">
                                    <a
                                        href="#"
                                        className="text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        About
                                    </a>
                                    <a
                                        href="#"
                                        className="text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        Features
                                    </a>
                                    <a
                                        href="#"
                                        className="text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        Pricing
                                    </a>
                                    <a
                                        href="#"
                                        className="text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        Documentation
                                    </a>
                                    <a
                                        href="https://github.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        GitHub
                                    </a>
                                </div>
                            </div>
                            <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
                                <div className="text-sm text-muted-foreground">
                                    © {new Date().getFullYear()} BlockIndex. All rights reserved.
                                </div>
                                <div className="flex gap-4">
                                    <a
                                        href="#"
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        Terms
                                    </a>
                                    <a
                                        href="#"
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        Privacy
                                    </a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
};

export default LandingPage;
