import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Book, FolderOpen, LogOut, PenBox } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

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
            <Button variant={"destructive"}>
              <LogOut size={18} />
              <span className="hidden md:inline">Logout</span>
            </Button>
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
