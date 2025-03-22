import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Book, FolderOpen, LogOut, PenBox } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

import Profile from "./profile";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

function formatUserProfile(
  firstName: string | null,
  lastName: string | null
): string | null {
  if (firstName && lastName) {
    return (
      firstName.split("").slice(0, 1).join("") +
      lastName.split("").slice(0, 1).join("")
    );
  }
  return "NN";
}

const Header = () => {
  const { auth } = useAuth();

  return (
    <header className="container mx-auto">
      <nav className="flex justify-between py-6 px-4 items-center ">
        <Link href="/">
          <Button variant={"secondary"}>
            <Book size={18} />
            <span className="hidden md:inline">Life Journal</span>
          </Button>
        </Link>

        <div className="flex items-center gap-4">
          {/** Login and other auth logic here */}
          {auth.isAuthenticated && (
            <Link href="/dashboard#collections">
              <Button variant={"outline"} className="flex items-center gap-2">
                <FolderOpen size={18} />
                <span className="hidden md:inline">Collections</span>
              </Button>
            </Link>
          )}
          <Link href="/journal/write">
            <Button variant={"journal"}>
              <PenBox size={18} />
              <span className="hidden md:inline">Write New</span>
            </Button>
          </Link>
          {auth.isAuthenticated ? (
            <Popover>
              <PopoverTrigger>
                <div className="h-[3rem] w-[3rem] rounded-[50%] border flex justify-center items-center bg-gray-200">
                  {auth.user && (
                    <p className="font-bold text-[1rem] text-black">
                      {formatUserProfile(
                        auth.user?.firstName,
                        auth.user?.lastName
                      )}
                    </p>
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent className="bg-white shadow-lg border p-4 rounded-lg">
                <Profile />
              </PopoverContent>
            </Popover>
          ) : (
            <Link href="/sign-in">
              <Button variant={"journal"}>
                <LogOut size={18} />
                <span className="hidden md:inline">Login</span>
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
