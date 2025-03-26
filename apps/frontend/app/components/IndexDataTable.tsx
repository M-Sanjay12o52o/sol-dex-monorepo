import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp, ArrowDownUp, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Column {
    key: string;
    header: string;
    cell?: (value: any, row: any) => React.ReactNode;
    sortable?: boolean;
}

interface IndexDataTableProps {
    title: string;
    description?: string;
    columns: Column[];
    data: any[];
    pageSize?: number;
    className?: string;
}

const IndexDataTable = ({
    title,
    description,
    columns,
    data,
    pageSize = 5,
    className
}: IndexDataTableProps) => {
    const [sortKey, setSortKey] = React.useState<string | null>(null);
    const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');
    const [page, setPage] = React.useState(1);

    const handleSort = (key: string) => {
        if (sortKey === key) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDirection('asc');
        }
    };

    const sortedData = React.useMemo(() => {
        if (!sortKey) return data;

        return [...data].sort((a, b) => {
            const aValue = a[sortKey];
            const bValue = b[sortKey];

            if (aValue === bValue) return 0;

            const comparison = aValue > bValue ? 1 : -1;
            return sortDirection === 'desc' ? comparison * -1 : comparison;
        });
    }, [data, sortKey, sortDirection]);

    const paginatedData = React.useMemo(() => {
        const start = (page - 1) * pageSize;
        return sortedData.slice(start, start + pageSize);
    }, [sortedData, page, pageSize]);

    const maxPage = Math.ceil(data.length / pageSize);

    return (
        <Card className={cn("animate-fade-in-up overflow-hidden", className)}>
            <CardHeader>
                <CardTitle className="text-lg font-medium">{title}</CardTitle>
                {description && (
                    <p className="text-sm text-muted-foreground">{description}</p>
                )}
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableHead key={column.key} className="whitespace-nowrap">
                                        {column.sortable ? (
                                            <button
                                                onClick={() => handleSort(column.key)}
                                                className="flex items-center gap-1 hover:text-primary transition-colors"
                                            >
                                                {column.header}
                                                {sortKey === column.key ? (
                                                    sortDirection === 'asc' ? (
                                                        <ArrowUp className="h-3 w-3" />
                                                    ) : (
                                                        <ArrowDown className="h-3 w-3" />
                                                    )
                                                ) : (
                                                    <ArrowDownUp className="h-3 w-3 opacity-30" />
                                                )}
                                            </button>
                                        ) : (
                                            column.header
                                        )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedData.map((row, rowIndex) => (
                                <TableRow key={rowIndex} className="hover:bg-muted/50">
                                    {columns.map((column) => (
                                        <TableCell key={`${rowIndex}-${column.key}`}>
                                            {column.cell ? column.cell(row[column.key], row) : row[column.key]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
            {maxPage > 1 && (
                <CardFooter className="flex justify-between p-4 pt-2 border-t">
                    <div className="text-sm text-muted-foreground">
                        Showing {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, data.length)} of {data.length}
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage(Math.max(1, page - 1))}
                            disabled={page === 1}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage(Math.min(maxPage, page + 1))}
                            disabled={page === maxPage}
                        >
                            Next
                        </Button>
                    </div>
                </CardFooter>
            )}
        </Card>
    );
};

export default IndexDataTable;
