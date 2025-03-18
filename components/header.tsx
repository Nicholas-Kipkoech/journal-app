import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { FolderOpen, LogOut, PenBox } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

const Header = () => {
  const { auth } = useAuth();
  return (
    <header className="container mx-auto">
      <nav className="flex justify-between py-6 px-4 items-center ">
        <Link
          href={"/"}
          className="bg-orange-500 text-white h-[2rem] rounded-sm px-2 flex justify-center items-center"
        >
          <span>Life Journal</span>
        </Link>

        <div className="flex items-center gap-4">
          {/** Login and other auth logic here */}
          <Link href="/dashboard#categories">
            <Button variant={"outline"} className="flex items-center gap-2">
              <FolderOpen size={18} />
              <span className="hidden md:inline">Categories</span>
            </Button>
          </Link>
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
