// Mock data for the indexing view
export const generateMockData = () => {
    // Metrics data
    const metrics = [
        {
            id: 'indexed-docs',
            title: 'Indexed Documents',
            value: '3,245,671',
            description: 'Total number of documents in the index',
            trend: { value: 2.4, isPositive: true },
            progress: 76,
            icon: 'Document'
        },
        {
            id: 'storage-used',
            title: 'Storage Used',
            value: '1.2 TB',
            description: 'Total storage consumption',
            trend: { value: 5.7, isPositive: true },
            progress: 58,
            icon: 'Database'
        },
        {
            id: 'avg-latency',
            title: 'Average Latency',
            value: '8.2 ms',
            description: 'Average query response time',
            trend: { value: 3.1, isPositive: false },
            progress: 33,
            icon: 'Clock'
        },
        {
            id: 'active-connections',
            title: 'Active Connections',
            value: '547',
            description: 'Current number of active connections',
            trend: { value: 1.2, isPositive: true },
            progress: 65,
            icon: 'Link'
        }
    ];

    // Performance over time chart data
    const generateChartData = (days = 14) => {
        const data = [];
        const baseValue = 50;
        let lastValue = baseValue;

        for (let i = days; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);

            // Generate a somewhat realistic fluctuating value
            const change = Math.random() * 15 - 7; // -7 to +8
            lastValue = Math.max(0, Math.min(100, lastValue + change));

            data.push({
                name: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                value: Math.round(lastValue * 10) / 10
            });
        }

        return data;
    };

    // Index status table data
    const indexStatuses = [
        'Active', 'Building', 'Optimizing', 'Active', 'Reindexing',
        'Active', 'Building', 'Active', 'Active', 'Merging'
    ];

    const generateTableData = (count = 10) => {
        const data = [];

        for (let i = 0; i < count; i++) {
            data.push({
                id: `idx-${(10000 + i).toString()}`,
                name: `Index-${String.fromCharCode(65 + i % 26)}${Math.floor(i / 26) || ''}`,
                type: ['Primary', 'Secondary', 'Auxiliary', 'Lookup', 'Backup'][i % 5],
                documents: Math.floor(Math.random() * 1000000) + 10000,
                status: indexStatuses[i],
                lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000))
            });
        }

        return data;
    };

    return {
        metrics,
        performanceData: generateChartData(),
        throughputData: generateChartData(),
        tableData: generateTableData(10)
    };
};

export default generateMockData;