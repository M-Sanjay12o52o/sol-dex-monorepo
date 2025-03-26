"use client";

import React, { useState, useEffect } from 'react';
import {
    Clock,
    Database,
    FileText,
    Link,
    ChevronDown,
    RefreshCw,
    Filter,
    ArrowDownUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

import IndexMetricsCard from './IndexMetricsCard';
import IndexSummaryChart from './IndexSummaryChart';
import IndexDataTable from './IndexDataTable';
import StatusBadge from './StatusBadge';
import generateMockData from '../../services/mockData';

const getStatusType = (status: string): 'success' | 'warning' | 'error' | 'info' | 'pending' => {
    const statusMap: Record<string, 'success' | 'warning' | 'error' | 'info' | 'pending'> = {
        'Active': 'success',
        'Building': 'info',
        'Optimizing': 'info',
        'Reindexing': 'warning',
        'Merging': 'info',
        'Error': 'error',
        'Offline': 'error',
        'Pending': 'pending'
    };

    return statusMap[status] || 'info';
};

const formatNumber = (num: number): string => {
    if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}K`;
    } else {
        return num.toString();
    }
};

const IndexingView = () => {
    const [data, setData] = useState(() => generateMockData());
    const [isRefreshing, setIsRefreshing] = useState(false);

    const refreshData = () => {
        setIsRefreshing(true);

        // Simulate a data refresh
        setTimeout(() => {
            setData(generateMockData());
            setIsRefreshing(false);
            toast.success('Data refreshed successfully');
        }, 800);
    };

    // Map icon keys to actual components
    const iconMap: Record<string, React.ReactNode> = {
        'Document': <FileText className="h-4 w-4 text-primary" />,
        'Database': <Database className="h-4 w-4 text-primary" />,
        'Clock': <Clock className="h-4 w-4 text-primary" />,
        'Link': <Link className="h-4 w-4 text-primary" />
    };

    // Table columns configuration
    const columns = [
        {
            key: 'id',
            header: 'ID',
            cell: (value: string) => (
                <div className="font-mono text-xs text-muted-foreground">{value}</div>
            )
        },
        {
            key: 'name',
            header: 'Index Name',
            sortable: true,
            cell: (value: string) => (
                <div className="font-medium">{value}</div>
            )
        },
        {
            key: 'type',
            header: 'Type',
            sortable: true
        },
        {
            key: 'documents',
            header: 'Documents',
            sortable: true,
            cell: (value: number) => formatNumber(value)
        },
        {
            key: 'status',
            header: 'Status',
            sortable: true,
            cell: (value: string) => (
                <StatusBadge status={getStatusType(value)} text={value} />
            )
        },
        {
            key: 'lastUpdated',
            header: 'Last Updated',
            sortable: true,
            cell: (value: Date) => value.toLocaleString()
        }
    ];

    useEffect(() => {
        // Initial load animation delay
        const timer = setTimeout(() => {
            document.querySelector('.content-wrapper')?.classList.add('opacity-100');
            document.querySelector('.content-wrapper')?.classList.remove('opacity-0');
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-background to-secondary/20 py-8 px-4 md:px-8">
            <div className="content-wrapper max-w-7xl mx-auto transition-opacity duration-500 opacity-0">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-semibold tracking-tight">Indexing Dashboard</h1>
                        <p className="text-muted-foreground mt-1">Monitor and manage your indexing performance</p>
                    </div>

                    <div className="flex space-x-2">
                        <Button
                            variant="outline"
                            onClick={refreshData}
                            disabled={isRefreshing}
                            className="flex items-center gap-1"
                        >
                            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                            Refresh
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="flex items-center gap-1">
                                    <Filter className="h-4 w-4" />
                                    Filter
                                    <ChevronDown className="h-4 w-4 ml-1" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem>All Indexes</DropdownMenuItem>
                                <DropdownMenuItem>Active Only</DropdownMenuItem>
                                <DropdownMenuItem>Needs Attention</DropdownMenuItem>
                                <DropdownMenuItem>Recently Updated</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Metrics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {data.metrics.map((metric, index) => (
                        <IndexMetricsCard
                            key={metric.id}
                            title={metric.title}
                            value={metric.value}
                            description={metric.description}
                            trend={metric.trend}
                            progress={metric.progress}
                            icon={iconMap[metric.icon]}
                            className={`transition-all duration-300 delay-${index * 100}`}
                        />
                    ))}
                </div>

                {/* Charts Section */}
                <div className="mb-8">
                    <Tabs defaultValue="performance" className="w-full">
                        <div className="flex justify-between items-center mb-4">
                            <TabsList>
                                <TabsTrigger value="performance">Performance</TabsTrigger>
                                <TabsTrigger value="throughput">Throughput</TabsTrigger>
                                <TabsTrigger value="errors">Errors</TabsTrigger>
                            </TabsList>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                        Last 14 Days
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Last 7 Days</DropdownMenuItem>
                                    <DropdownMenuItem>Last 14 Days</DropdownMenuItem>
                                    <DropdownMenuItem>Last 30 Days</DropdownMenuItem>
                                    <DropdownMenuItem>Last 90 Days</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <TabsContent value="performance" className="mt-0">
                            <IndexSummaryChart
                                title="Query Performance"
                                subtitle="Average query response time in milliseconds"
                                data={data.performanceData}
                            />
                        </TabsContent>

                        <TabsContent value="throughput" className="mt-0">
                            <IndexSummaryChart
                                title="Indexing Throughput"
                                subtitle="Documents processed per second"
                                data={data.throughputData}
                            />
                        </TabsContent>

                        <TabsContent value="errors" className="mt-0">
                            <Card className="glassmorphism animate-fade-in">
                                <CardContent className="flex items-center justify-center py-16">
                                    <p className="text-muted-foreground">No errors recorded in the selected time period</p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Index Table */}
                <div className="mb-8">
                    <IndexDataTable
                        title="Index Status"
                        description="Current status of all indexes in the system"
                        columns={columns}
                        data={data.tableData}
                        pageSize={5}
                    />
                </div>

                {/* Info Card */}
                <Card className="glassmorphism mb-8 animate-fade-in-up">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-medium mb-1">Optimize Your Indexing</h3>
                                <p className="text-sm text-muted-foreground max-w-2xl">
                                    Improve performance by optimizing your index configuration. Our analysis suggests that
                                    optimizing field selections could improve query latency by up to 23%.
                                </p>
                            </div>
                            <Button className="whitespace-nowrap">View Recommendations</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Help Resources */}
                <div className="rounded-lg border bg-card text-card-foreground animate-scale-in">
                    <div className="p-6">
                        <h3 className="text-lg font-medium mb-4">Indexing Resources</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card className="bg-primary/5 border-none">
                                <CardContent className="p-4">
                                    <h4 className="font-medium mb-1">Documentation</h4>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        Comprehensive guides on indexing best practices
                                    </p>
                                    <Button variant="link" className="p-0 h-auto">Read Documentation →</Button>
                                </CardContent>
                            </Card>

                            <Card className="bg-primary/5 border-none">
                                <CardContent className="p-4">
                                    <h4 className="font-medium mb-1">Performance Tips</h4>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        Learn how to optimize your indexing for speed
                                    </p>
                                    <Button variant="link" className="p-0 h-auto">View Tips →</Button>
                                </CardContent>
                            </Card>

                            <Card className="bg-primary/5 border-none">
                                <CardContent className="p-4">
                                    <h4 className="font-medium mb-1">Troubleshooting</h4>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        Solutions for common indexing issues
                                    </p>
                                    <Button variant="link" className="p-0 h-auto">View Solutions →</Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndexingView;