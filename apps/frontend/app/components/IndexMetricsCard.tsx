import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowUpRight, ArrowDownRight, Layers } from 'lucide-react';
import { cn } from './lib/utils';

interface IndexMetricsCardProps {
    title: string;
    value: string | number;
    description?: string;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    progress?: number;
    icon?: React.ReactNode;
    className?: string;
}

const IndexMetricsCard = ({
    title,
    value,
    description,
    trend,
    progress,
    icon = <Layers className="h-4 w-4 text-primary" />,
    className
}: IndexMetricsCardProps) => {
    return (
        <Card className={cn("animate-scale-in overflow-hidden", className)}>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="p-1 rounded-md bg-primary/10">
                            {icon}
                        </div>
                        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                    </div>
                    {trend && (
                        <div className={cn(
                            "flex items-center text-xs font-medium",
                            trend.isPositive ? "text-green-500" : "text-red-500"
                        )}>
                            {trend.isPositive ? (
                                <ArrowUpRight className="h-3 w-3 mr-0.5" />
                            ) : (
                                <ArrowDownRight className="h-3 w-3 mr-0.5" />
                            )}
                            {Math.abs(trend.value)}%
                        </div>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    <div className="text-2xl font-bold">{value}</div>
                    {description && (
                        <CardDescription className="text-xs line-clamp-2">{description}</CardDescription>
                    )}
                    {progress !== undefined && (
                        <Progress value={progress} className="h-1.5" />
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default IndexMetricsCard;
