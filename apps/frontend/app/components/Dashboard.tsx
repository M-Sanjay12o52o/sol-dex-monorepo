"use client"

import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from "recharts";
import {
    ChevronRight,
    Database,
    LayoutDashboard,
    Settings,
    Activity,
    BarChart2,
    PieChart as PieChartIcon,
    RefreshCw,
    Clock,
    Users
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Dashboard: React.FC = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("overview");
    const { data: session, status } = useSession();

    if (status === "loading") return <div>Loading....</div>

    if (!session) {
        return null;
    }

    // Mock statistics
    const stats = [
        { label: "Indexed Tables", value: "4", icon: Database, change: "+1 from last week", trend: "up" },
        { label: "Data Points", value: "12,458", icon: Activity, change: "+2,304 from last week", trend: "up" },
        { label: "Last Update", value: "2 hours ago", icon: Clock, change: "On schedule", trend: "neutral" },
        { label: "Active Users", value: "37", icon: Users, change: "+5 from last week", trend: "up" },
    ];

    // Mock activity data for charts
    const activityData = [
        { name: "Mon", transactions: 420, blocks: 240 },
        { name: "Tue", transactions: 380, blocks: 220 },
        { name: "Wed", transactions: 510, blocks: 280 },
        { name: "Thu", transactions: 470, blocks: 250 },
        { name: "Fri", transactions: 540, blocks: 290 },
        { name: "Sat", transactions: 320, blocks: 230 },
        { name: "Sun", transactions: 280, blocks: 200 },
    ];

    // Mock pie chart data
    const dataTypeDistribution = [
        { name: "Transactions", value: 65 },
        { name: "Blocks", value: 15 },
        { name: "Accounts", value: 10 },
        { name: "Events", value: 10 },
    ];

    const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

    // Mock recent operations
    const recentOperations = [
        { id: 1, operation: "Full Index", status: "Complete", timestamp: "2023-09-23 14:32", duration: "45m 12s" },
        { id: 2, operation: "Schema Update", status: "Complete", timestamp: "2023-09-22 09:15", duration: "2m 04s" },
        { id: 3, operation: "Incremental Update", status: "Complete", timestamp: "2023-09-21 18:45", duration: "12m 37s" },
        { id: 4, operation: "Data Cleanup", status: "Failed", timestamp: "2023-09-20 11:20", duration: "8m 53s" },
        { id: 5, operation: "Backup Creation", status: "Complete", timestamp: "2023-09-19 22:05", duration: "14m 22s" },
    ];

    return (
        <div className="min-h-screen w-full bg-background flex flex-col">
            <main className="flex-1 p-6">
                <div className="max-w-7xl mx-auto space-y-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                            <p className="text-muted-foreground">
                                View and manage your blockchain indexing operations
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Refresh
                            </Button>
                            <Button onClick={() => router.push("/connect")}>
                                <Database className="mr-2 h-4 w-4" />
                                Connect Database
                            </Button>
                        </div>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {stats.map((stat, i) => (
                            <Card key={i} className="hover:shadow-md transition-all">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="text-sm font-medium text-muted-foreground">
                                            {stat.label}
                                        </div>
                                        <stat.icon className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <div className="text-3xl font-bold">{stat.value}</div>
                                    <div className={`text-xs mt-2 flex items-center ${stat.trend === "up" ? "text-green-500" :
                                        stat.trend === "down" ? "text-red-500" :
                                            "text-muted-foreground"
                                        }`}>
                                        {stat.change}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Tabs for different views */}
                    <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full md:w-auto grid-cols-3 mb-4">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="activity">Activity</TabsTrigger>
                            <TabsTrigger value="operations">Operations</TabsTrigger>
                        </TabsList>

                        {/* Overview Tab */}
                        <TabsContent value="overview" className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                {/* Activity Chart */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <BarChart2 className="h-5 w-5 mr-2 text-primary" />
                                            Weekly Activity
                                        </CardTitle>
                                        <CardDescription>Transaction and block indexing over time</CardDescription>
                                    </CardHeader>
                                    <CardContent className="pl-2">
                                        <div className="h-80">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart
                                                    data={activityData}
                                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                                >
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="name" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Bar dataKey="transactions" fill="#8884d8" name="Transactions" />
                                                    <Bar dataKey="blocks" fill="#82ca9d" name="Blocks" />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Data Distribution */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <PieChartIcon className="h-5 w-5 mr-2 text-primary" />
                                            Data Distribution
                                        </CardTitle>
                                        <CardDescription>Breakdown of indexed data types</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-80">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie
                                                        data={dataTypeDistribution}
                                                        cx="50%"
                                                        cy="50%"
                                                        labelLine={false}
                                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                                        outerRadius={80}
                                                        fill="#8884d8"
                                                        dataKey="value"
                                                    >
                                                        {dataTypeDistribution.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Quick Actions */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Quick Actions</CardTitle>
                                    <CardDescription>Get started with your indexing journey</CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-4 md:grid-cols-2">
                                    <Button variant="outline" className="h-20 justify-start" onClick={() => router.push("/connect")}>
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center space-x-3">
                                                <Database className="h-5 w-5 text-primary" />
                                                <div className="text-left">
                                                    <div className="font-medium">Connect Database</div>
                                                    <div className="text-sm text-muted-foreground">
                                                        Set up your PostgreSQL connection
                                                    </div>
                                                </div>
                                            </div>
                                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                    </Button>

                                    <Button variant="outline" className="h-20 justify-start" onClick={() => router.push("/options")}>
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center space-x-3">
                                                <Settings className="h-5 w-5 text-primary" />
                                                <div className="text-left">
                                                    <div className="font-medium">Configure Options</div>
                                                    <div className="text-sm text-muted-foreground">
                                                        Select blockchain data to index
                                                    </div>
                                                </div>
                                            </div>
                                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                    </Button>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Activity Tab */}
                        <TabsContent value="activity" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Activity Over Time</CardTitle>
                                    <CardDescription>
                                        Detailed breakdown of blockchain data indexing activity
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-96">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart
                                                data={activityData}
                                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Bar dataKey="transactions" fill="#8884d8" name="Transactions" />
                                                <Bar dataKey="blocks" fill="#82ca9d" name="Blocks" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Operations Tab */}
                        <TabsContent value="operations" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Recent Operations</CardTitle>
                                    <CardDescription>
                                        History of indexing operations and their status
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Operation</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Timestamp</TableHead>
                                                <TableHead>Duration</TableHead>
                                                <TableHead className="text-right">Action</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {recentOperations.map((op) => (
                                                <TableRow key={op.id}>
                                                    <TableCell className="font-medium">{op.operation}</TableCell>
                                                    <TableCell>
                                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${op.status === 'Complete'
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                                            }`}>
                                                            {op.status}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell>{op.timestamp}</TableCell>
                                                    <TableCell>{op.duration}</TableCell>
                                                    <TableCell className="text-right">
                                                        <Button variant="ghost" size="sm">
                                                            Details
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline" size="sm" className="ml-auto">
                                        View All Operations
                                    </Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;