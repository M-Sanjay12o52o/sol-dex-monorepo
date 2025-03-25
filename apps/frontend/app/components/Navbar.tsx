
import React from "react";
import { Database, Github } from "lucide-react";
import Link from "next/link";
import UserAvatar from "./UserAvatar";

const Header: React.FC = () => {
    return (
        <header className="w-full h-16 px-6 flex items-center justify-between transition-all duration-300 ease-apple bg-transparent">
            <Link href="/" className="flex items-center space-x-2 animate-fade-in">
                <Database className="h-6 w-6 text-primary animate-float" />
                <h1 className="text-lg font-medium tracking-tight">SOL-DEX</h1>
            </Link>

            <div className="flex items-center space-x-4">
                <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors animate-fade-in"
                >
                    <Github className="h-4 w-4" />
                    <span>GitHub</span>
                </a>
                <UserAvatar />
            </div>
        </header>
    );
};

export default Header;
