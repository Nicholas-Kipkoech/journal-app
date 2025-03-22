import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useAuth } from "@/app/context/AuthContext";

const Profile = () => {
  const { auth, logout } = useAuth();
  return (
    <div className="h-auto  text-[14px] flex flex-col gap-2">
      <div>
        <label>First Name</label>
        <Input defaultValue={auth.user?.firstName} />
      </div>
      <div>
        <label>Last Name</label>
        <Input defaultValue={auth.user?.lastName} />
      </div>
      <div>
        <label>Email</label>
        <Input defaultValue={auth.user?.email} disabled />
      </div>
      <div>
        <label>Password</label>
        <Input />
      </div>
      <Button variant={"journal"} className="w-full my-3.5 rounded-xl">
        Update profile
      </Button>
      <Button
        variant={"destructive"}
        className="w-full  rounded-xl"
        onClick={logout}
      >
        Logout
      </Button>
    </div>
  );
};

export default Profile;
