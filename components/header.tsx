import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { FolderOpen, PenBox } from "lucide-react";

const Header = () => {
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
        </div>
      </nav>
    </header>
  );
};

export default Header;
