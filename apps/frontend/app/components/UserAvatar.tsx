"use client"

// import { auth } from "../../auth";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@components/ui/dropdown-menu";
import { Button } from "@components/ui/button";
import { LogOut, Settings, User } from "lucide-react";
import { useSession } from "next-auth/react";
// import { SignOut } from "./auth/server/signout-button";
// import { signOut } from "../../auth"; // using this in client component throws error
import { SignOut } from "@components/auth/client/signout-button"


export default function UserAvatar() {
    // const session = await auth();
    const { data: session, status } = useSession();

    if (status === "loading") return <p>Loading...</p>

    if (!session?.user) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 rounded-full">
                    <Avatar className="h-10 w-10 cursor-pointer">
                        <AvatarImage src={session.user.image || ""} alt={session.user.name || "User"} />
                        <AvatarFallback>{session.user.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <div className="px-4 py-2 text-sm">
                    <p className="font-medium">{session.user.name || "User"}</p>
                    <p className="text-gray-500 text-xs">{session.user.email || "No email"}</p>
                </div>
                <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <SignOut />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu >
    );
}
