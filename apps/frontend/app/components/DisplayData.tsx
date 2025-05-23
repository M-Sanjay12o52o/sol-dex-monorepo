"use client";

import React, { useEffect, useState } from "react";
import DataDisplay from "@/components/DataDisplay";

interface OptionConfig {
    id: string;
    configValue?: string;
}

const DisplayPage: React.FC = () => {
    const [selectedOptions, setSelectedOptions] = useState<OptionConfig[]>([]);

    useEffect(() => {
        const options = localStorage.getItem("selectedOptions");
        console.log("component DisplayData: ", options);

        if (options) {
            setSelectedOptions(JSON.parse(options));
        }
    }, []);

    return (
        <div className="min-h-screen w-full bg-background flex flex-col">
            <main className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="max-w-2xl w-full space-y-6">
                    <DataDisplay
                        selectedOptions={selectedOptions}
                        connectionString="" // retrieve if required
                    />
                </div>
            </main>
        </div>
    );
};

export default DisplayPage;
