import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";

interface StatusIndicatorProps {
    selectedOptions: string[];
    connectionString: string;
    onReset: () => void;
    onComplete?: () => void;  // Added this prop
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ selectedOptions, connectionString, onReset, onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState<"indexing" | "success" | "error">("indexing");

    useEffect(() => {
        // Simulate indexing progress
        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                const newProgress = prevProgress + 20;
                if (newProgress >= 100) {
                    clearInterval(interval);
                    setStatus("success");
                    onComplete?.(); // Call the onComplete callback when indexing is done
                    return 100;
                }
                return newProgress;
            });
        }, 500);

        return () => clearInterval(interval);
    }, [selectedOptions, connectionString, onComplete]);

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Indexing Status</CardTitle>
                <CardDescription>
                    Track the progress of indexing blockchain data into your Postgres database.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {status === "indexing" && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span>Indexing Progress:</span>
                            <span>{progress}%</span>
                        </div>
                        <Progress value={progress} />
                    </div>
                )}
                {status === "success" && (
                    <div className="flex flex-col items-center space-y-4">
                        <CheckCircle2 className="h-12 w-12 text-green-500" />
                        <h2 className="text-2xl font-semibold">Indexing Complete!</h2>
                        <p className="text-muted-foreground">
                            All selected blockchain data has been successfully indexed.
                        </p>

                        <div>
                            <Link href={"/view"}>View Index Data</Link>
                        </div>
                    </div>
                )}
                {status === "error" && (
                    <div className="flex flex-col items-center space-y-4">
                        {/* Replace with error icon */}
                        <h2 className="text-2xl font-semibold">Indexing Failed</h2>
                        <p className="text-muted-foreground">
                            There was an error indexing the blockchain data. Please check your connection string and try again.
                        </p>
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button onClick={onReset} disabled={status === "indexing"}>
                    {status === "indexing" ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Indexing...
                        </>
                    ) : (
                        "Reset"
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default StatusIndicator;
