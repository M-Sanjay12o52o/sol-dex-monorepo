"use client"


import React, { useState } from "react";
import StatusIndicator from "@components/StatusIndicator";

interface OptionConfig {
    id: string;
    configValue?: string;
}

const IndexingPage: React.FC = () => {
    const [selectedOptions, setSelectedOptions] = useState<OptionConfig[]>([]);

    // Extract just the IDs for the StatusIndicator
    const optionIds = selectedOptions.map(option => option.id);

    const handleComplete = () => {

    }

    const handleReset = () => {

    }

    return (
        <div className="min-h-screen w-full bg-background flex flex-col">
            <main className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="max-w-2xl w-full space-y-6">
                    <StatusIndicator
                        selectedOptions={optionIds}
                        connectionString="" // optional, or retrieve from storage if needed
                        onComplete={handleComplete}
                        onReset={handleReset}
                    />
                </div>
            </main>
        </div>
    );
};

export default IndexingPage;
