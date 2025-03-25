import React, { useState } from "react";
import { Card, CardContent } from "@components/ui/card";
import { Button } from "@components/ui/button";
import { Check, ChevronRight, Coins, Layers, PieChart, TagIcon, Settings, Database, Activity, Table } from "lucide-react";
import { useToast } from "hooks/use-toast";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@components/ui/select";
import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group";
import { Label } from "@components/ui/label";

export interface IndexOption {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    configOptions?: string[];
}

interface IndexingOptionsProps {
    onSelect: (options: { id: string; configValue?: string }[]) => void;
}

const IndexingOptions: React.FC<IndexingOptionsProps> = ({ onSelect }) => {
    const [selectedOptions, setSelectedOptions] = useState<{ id: string; configValue?: string }[]>([]);
    const { toast } = useToast();

    const indexOptions: IndexOption[] = [
        {
            id: "nft_bids",
            title: "NFT Bids",
            description: "Track currently available bids on NFTs",
            icon: <TagIcon className="h-4 w-4" />,
            configOptions: ["All Collections", "Top 100 Collections", "Custom Collection List", "Magic Eden Only"]
        },
        {
            id: "nft_prices",
            title: "NFT Prices",
            description: "Index current prices of NFTs",
            icon: <PieChart className="h-4 w-4" />,
            configOptions: ["All Marketplaces", "Magic Eden Only", "OpenSea Only"]
        },
        {
            id: "available_tokens",
            title: "Available Tokens",
            description: "Track tokens available to borrow",
            icon: <Coins className="h-4 w-4" />,
            configOptions: ["All Tokens", "SPL Tokens", "Top 50 by Market Cap"]
        },
        {
            id: "token_prices",
            title: "Token Prices",
            description: "Index token prices across platforms",
            icon: <Layers className="h-4 w-4" />,
            configOptions: ["All DEXs", "Jupiter Only", "Raydium Only", "Orca Only"]
        },
    ];

    const toggleOption = (id: string) => {
        setSelectedOptions((prev) => {
            if (prev.some((option) => option.id === id)) {
                return prev;
            } else {
                const option = indexOptions.find(opt => opt.id === id);
                if (option?.configOptions) {
                    return [...prev, { id, configValue: option.configOptions[0] }];
                }
                return [...prev, { id }];
            }
        });
    };

    const removeOption = (id: string) => {
        setSelectedOptions((prev) => prev.filter((option) => option.id !== id));
    };

    const setConfigValue = (id: string, value: string) => {
        setSelectedOptions(prev =>
            prev.map(option =>
                option.id === id ? { ...option, configValue: value } : option
            )
        );
    };

    const handleSubmit = () => {
        if (selectedOptions.length === 0) {
            toast({
                title: "No options selected",
                description: "Please select at least one data category to index",
                variant: "destructive",
            });
            return;
        }

        onSelect(selectedOptions);
        toast({
            title: "Indexing started",
            description: `Started indexing ${selectedOptions.length} data categories`,
        });
    };

    return (
        <Card className="w-full shadow-sm border border-border/50 animate-fade-in stagger-2 transition-all duration-300 hover:shadow-md ease-apple">
            <CardContent className="pt-6">
                <div className="space-y-6">
                    <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Layers className="h-4 w-4 text-primary" />
                        </div>
                        <h2 className="text-xl font-medium tracking-tight">Select Data to Index</h2>
                    </div>

                    <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                            Choose what blockchain data you want to index into your database
                        </p>

                        <div className="grid grid-cols-1 gap-4 pt-2">
                            {indexOptions.map((option, index) => {
                                const isSelected = selectedOptions.some((opt) => opt.id === option.id);
                                const selectedConfig = selectedOptions.find(opt => opt.id === option.id)?.configValue;

                                return (
                                    <div
                                        key={option.id}
                                        className={`
                      rounded-lg border transition-all duration-200 ease-apple animate-fade-in overflow-hidden
                      ${isSelected
                                                ? 'border-primary/50 bg-primary/5'
                                                : 'border-border bg-card hover:border-primary/30 hover:bg-secondary/50'}
                    `}
                                        style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                                    >
                                        <div
                                            className="p-4 cursor-pointer flex items-start justify-between"
                                            onClick={() => toggleOption(option.id)}
                                        >
                                            <div className="flex space-x-3">
                                                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                                                    {option.icon}
                                                </div>
                                                <div>
                                                    <h3 className="font-medium">{option.title}</h3>
                                                    <p className="text-sm text-muted-foreground mt-1">{option.description}</p>

                                                    {isSelected && option.configOptions && selectedConfig && (
                                                        <div className="flex items-center mt-2 text-xs text-primary">
                                                            <Settings className="h-3 w-3 mr-1" />
                                                            <span>{selectedConfig}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                {isSelected && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 px-2 text-xs"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            removeOption(option.id);
                                                        }}
                                                    >
                                                        Remove
                                                    </Button>
                                                )}

                                                <div className={`h-5 w-5 rounded-full flex items-center justify-center transition-all duration-200 ${isSelected
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'border border-muted-foreground/30'
                                                    }`}>
                                                    {isSelected && <Check className="h-3 w-3" />}
                                                </div>
                                            </div>
                                        </div>

                                        {isSelected && option.configOptions && (
                                            <div className="p-4 border-t border-primary/10 bg-secondary/20 animate-fade-in">
                                                <div className="flex items-center mb-3">
                                                    <Settings className="h-3 w-3 mr-1.5 text-primary" />
                                                    <h4 className="text-sm font-medium">Configure {option.title}</h4>
                                                </div>

                                                <RadioGroup
                                                    defaultValue={selectedConfig || option.configOptions[0]}
                                                    value={selectedConfig || option.configOptions[0]}
                                                    onValueChange={(value) => setConfigValue(option.id, value)}
                                                    className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                                                >
                                                    {option.configOptions.map((configOpt) => (
                                                        <div key={configOpt} className="flex items-center space-x-2 p-2 rounded hover:bg-secondary/30 transition-colors">
                                                            <RadioGroupItem value={configOpt} id={`${option.id}-${configOpt}`} />
                                                            <Label htmlFor={`${option.id}-${configOpt}`} className="text-sm cursor-pointer">
                                                                {configOpt}
                                                            </Label>
                                                        </div>
                                                    ))}
                                                </RadioGroup>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <Button
                            onClick={handleSubmit}
                            className="w-full h-11 mt-4 font-medium transition-all duration-300 ease-apple group"
                        >
                            Start Indexing
                            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default IndexingOptions;
