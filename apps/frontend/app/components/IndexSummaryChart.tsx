import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

interface IndexSummaryChartProps {
    title: string;
    subtitle?: string;
    data: Array<{
        name: string;
        value: number;
        [key: string]: any;
    }>;
    className?: string;
}

const IndexSummaryChart = ({
    title,
    subtitle,
    data,
    className
}: IndexSummaryChartProps) => {
    return (
        <Card className={cn("overflow-hidden animate-fade-in", className)}>
            <CardHeader className="pb-0">
                <CardTitle className="text-lg font-medium">{title}</CardTitle>
                {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
            </CardHeader>
            <CardContent className="pt-4">
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                            <XAxis
                                dataKey="name"
                                tick={{ fontSize: 12 }}
                                tickLine={false}
                                axisLine={false}
                                dy={10}
                            />
                            <YAxis
                                tick={{ fontSize: 12 }}
                                tickLine={false}
                                axisLine={false}
                                dx={-10}
                            />
                            <Tooltip
                                contentStyle={{
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    border: 'none',
                                    padding: '10px'
                                }}
                                labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="hsl(var(--primary))"
                                strokeWidth={2}
                                dot={{ r: 0 }}
                                activeDot={{ r: 6, strokeWidth: 0 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default IndexSummaryChart;
