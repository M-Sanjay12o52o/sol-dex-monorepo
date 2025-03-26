"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface OptionConfig {
    id: string;
    configValue?: string;
}

interface DataDisplayProps {
    selectedOptions: OptionConfig[] | string[];
    connectionString: string;
}

interface BlockchainData {
    id: string;
    timestamp: string;
    type: string;
    data: any;
}

const DataDisplay: React.FC<DataDisplayProps> = ({
    selectedOptions,
    connectionString,
}) => {
    // Handle both formats of selectedOptions (backward compatibility)
    const normalizedOptions = selectedOptions.map((option) =>
        typeof option === "string" ? { id: option } : option
    ) as OptionConfig[];

    console.log("DataDisplay normalizedOptions: ", normalizedOptions);

    const [activeTab, setActiveTab] = useState(normalizedOptions[0]?.id || "");
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<Record<string, BlockchainData[]>>({});

    useEffect(() => {
        // In a real application, you would fetch data from your database here
        // For this demo, we'll simulate data fetching with a timeout
        const fetchData = async () => {
            setIsLoading(true);

            try {
                // Simulate API call to fetch indexed data
                await new Promise((resolve) => setTimeout(resolve, 1500));

                // Generate mock data for each selected option
                const mockData: Record<string, BlockchainData[]> = {};

                normalizedOptions.forEach((option) => {
                    const configText = option.configValue
                        ? ` (${option.configValue})`
                        : "";

                    mockData[option.id] = Array(5)
                        .fill(null)
                        .map((_, i) => ({
                            id: `${option.id}-${i}`,
                            timestamp: new Date(Date.now() - i * 3600000).toISOString(),
                            type: option.id + configText,
                            data: {
                                sender: `sender${i}@example.com`,
                                recipient: `recipient${i}@example.com`,
                                amount: Math.random() * 10,
                                status: i % 2 === 0 ? "confirmed" : "pending",
                                source: option.configValue || "All Sources",
                            },
                        }));
                });

                setData(mockData);
            } catch (error) {
                console.error("Error fetching indexed data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [JSON.stringify(normalizedOptions), connectionString]);

    const getDisplayName = (optionId: string) => {
        // Convert snake_case to Title Case
        return optionId
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Indexed Blockchain Data</CardTitle>
                <CardDescription>
                    View the blockchain data indexed from your selected options
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="mb-4">
                        {normalizedOptions.map((option) => (
                            <TabsTrigger
                                key={option.id}
                                value={option.id}
                                className="capitalize"
                            >
                                {getDisplayName(option.id)}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {normalizedOptions.map((option) => (
                        <TabsContent key={option.id} value={option.id} className="w-full">
                            {option.configValue && (
                                <Badge variant="outline" className="mb-4">
                                    Data Source: {option.configValue}
                                </Badge>
                            )}

                            {isLoading ? (
                                <div className="space-y-2">
                                    <Skeleton className="h-10 w-full" />
                                    <Skeleton className="h-20 w-full" />
                                    <Skeleton className="h-20 w-full" />
                                    <Skeleton className="h-20 w-full" />
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>ID</TableHead>
                                            <TableHead>Timestamp</TableHead>
                                            <TableHead>Sender</TableHead>
                                            <TableHead>Recipient</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead>Source</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {data[option.id]?.length! > 0 ? (
                                            data[option.id]?.map((item) => (

                                                <TableRow key={item.id}>
                                                    <TableCell className="font-mono text-xs">
                                                        {item.id}
                                                    </TableCell>
                                                    <TableCell>
                                                        {new Date(item.timestamp).toLocaleString()}
                                                    </TableCell>
                                                    <TableCell>{item.data.sender}</TableCell>
                                                    <TableCell>{item.data.recipient}</TableCell>
                                                    <TableCell>{item.data.amount.toFixed(4)}</TableCell>
                                                    <TableCell>{item.data.source}</TableCell>
                                                    <TableCell>
                                                        <span
                                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${item.data.status === "confirmed"
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-yellow-100 text-yellow-800"
                                                                }`}
                                                        >
                                                            {item.data.status}
                                                        </span>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={7} className="text-center text-gray-500">
                                                    No data available
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            )}
                        </TabsContent>
                    ))}
                </Tabs>
            </CardContent>
        </Card>
    );
};

export default DataDisplay;
