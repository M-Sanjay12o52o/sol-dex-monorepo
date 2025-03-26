import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type StatusType = 'success' | 'warning' | 'error' | 'info' | 'pending';

interface StatusBadgeProps {
    status: StatusType;
    text?: string;
    className?: string;
}

const statusConfig = {
    success: {
        className: 'bg-green-50 text-green-600 border-green-200 hover:bg-green-100',
        defaultText: 'Success'
    },
    warning: {
        className: 'bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100',
        defaultText: 'Warning'
    },
    error: {
        className: 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100',
        defaultText: 'Error'
    },
    info: {
        className: 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100',
        defaultText: 'Info'
    },
    pending: {
        className: 'bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100',
        defaultText: 'Pending'
    }
};

const StatusBadge = ({ status, text, className }: StatusBadgeProps) => {
    const config = statusConfig[status];

    return (
        <Badge
            variant="outline"
            className={cn(config.className, className)}
        >
            {text || config.defaultText}
        </Badge>
    );
};

export default StatusBadge;