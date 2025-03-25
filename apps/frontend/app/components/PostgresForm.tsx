"use client"

import React, { useState } from "react";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { toast } from "sonner";
import { AlertCircle, Check } from "lucide-react";
import { useRouter } from "next/navigation";

interface PostgresFormProps {
}

const PostgresForm: React.FC<PostgresFormProps> = () => {
    const [connectionString, setConnectionString] = useState("");
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        if (isValid === false) {
            toast.error("Invalid connection string", {
                icon: <AlertCircle className="text-red-500" />,
            });
            return;
        }

        setLoading(true);

        console.log("handleSubmit log: ", connectionString);

        try {
            //TODO: api call to send connection string
            await new Promise((resolve) => setTimeout(resolve, 1000));

            toast.success("Connection successful", {
                icon: <Check className="text-green-500" />
            });

            router.push("/options");
        } catch (error) {
            toast.error("Failed to connect to database", {
                icon: <AlertCircle className="text-red-500" />,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="relative">
                <Input
                    placeholder="postgresql://user:password@localhost:5432/mydb"
                    value={connectionString}
                    onChange={(e) => {
                        setConnectionString(e.target.value);
                        setIsValid(null);
                    }}
                    // onPaste={handlePaste}
                    className={`transition-all duration-200 pl-3 pr-10 h-11 font-mono text-sm bg-secondary/50 border-muted focus:ring-1 focus:ring-primary/30 focus:border-primary/40 ${isValid === false ? "border-red-500" : isValid === true ? "border-green-500" : ""
                        }`}
                />
                {isValid !== null && (
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {isValid ? (
                            <Check className="text-green-500 w-5 h-5" />
                        ) : (
                            <AlertCircle className="text-red-500 w-5 h-5" />
                        )}
                    </span>
                )}
            </div>

            <Button
                onClick={handleSubmit}
                disabled={loading || isValid === false}
                className="cursor-pointer"
            >
                {loading ? "Saving..." : "Save Credentials"}
            </Button>
        </div>
    );
};

export default PostgresForm;