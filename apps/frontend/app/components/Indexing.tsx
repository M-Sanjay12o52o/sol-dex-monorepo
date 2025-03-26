"use client"


import React, { useState } from "react";
import StatusIndicator from "@/components/StatusIndicator";
import { useRouter } from "next/navigation";

interface OptionConfig {
    id: string;
    configValue?: string;
}

interface IndexingOptionsProps {
    onSelect: (options: { id: string; configValue?: string }[]) => void;
}

const IndexingPage: React.FC<IndexingOptionsProps> = ({ onSelect }) => {
    const [selectedOptions, setSelectedOptions] = useState<OptionConfig[]>([]);
    const router = useRouter();

    // Extract just the IDs for the StatusIndicator
    const optionIds = selectedOptions.map(option => option.id);

    const handleComplete = () => {

    }

    const handleReset = () => {
        router.push("/connect");
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
