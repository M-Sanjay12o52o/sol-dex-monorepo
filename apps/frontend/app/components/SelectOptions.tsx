import React from "react";
import IndexingOptions from "@components/IndexingOptions";
import { useRouter } from "next/navigation";

const OptionsPage: React.FC = () => {
    const router = useRouter();

    const handleOptionsSelected = (
        options: { id: string; configValue?: string }[]
    ) => {
        // Save complete options including configValues
        localStorage.setItem("selectedOptions", JSON.stringify(options));
        // navigate("/indexing");
        router.push("/status");
    };

    return (
        <div className="min-h-screen w-full bg-background flex flex-col">
            <main className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="max-w-2xl w-full space-y-6">
                    <IndexingOptions onSelect={handleOptionsSelected} />
                </div>
            </main>
        </div>
    );
};

export default OptionsPage;
