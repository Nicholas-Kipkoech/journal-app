import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="container mx-auto">
      <nav className="flex justify-between py-6 px-4 items-center ">
        <Link
          href={"/"}
          className="bg-amber-500 text-white p-2 rounded-md flex justify-center items-center"
        >
          <span>Life Journal</span>
        </Link>

        <div className="flex items-center gap-4">
          {/** Login and other auth logic here */}
        </div>
      </nav>
    </header>
  );
};

export default Header;
