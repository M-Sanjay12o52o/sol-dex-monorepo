import React from "react";
import IndexingOptions from "@components/Indexing";

const OptionsPage: React.FC = () => {

    return (
        <div className="min-h-screen w-full bg-background flex flex-col">
            <main className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="max-w-2xl w-full space-y-6">
                    <IndexingOptions />
                </div>
            </main>
        </div>
    );
};

export default OptionsPage;
