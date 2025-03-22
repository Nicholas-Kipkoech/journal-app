import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useAuth } from "@/app/context/AuthContext";
import useFetch from "@/app/hooks/use-fetch";
import { updateProfile } from "@/app/services/auth";
import { toast } from "sonner";

const Profile = () => {
  const { auth, logout } = useAuth();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    password: "",
  });

  useEffect(() => {
    if (auth.user) {
      setUser((prev) => ({
        ...prev,
        firstName: auth?.user?.firstName || "",
        lastName: auth?.user?.lastName || "",
      }));
    }
  }, [auth]);

  const { data, fn: updateUser, loading } = useFetch(updateProfile);
  const handleUpdate = () => {
    updateUser(user.firstName, user.lastName, user.password);

    toast.success("profile update successfully");
  };
  console.log(data);
  return (
    <div className="h-auto  text-[14px] flex flex-col gap-2">
      <div>
        <label>First Name</label>
        <Input
          value={user.firstName}
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        />
      </div>
      <div>
        <label>Last Name</label>
        <Input
          value={user.lastName}
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        />
      </div>
      <div>
        <label>Email</label>
        <Input defaultValue={auth.user?.email} disabled />
      </div>
      <div>
        <label>Password</label>
        <Input
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </div>
      <Button
        variant={"journal"}
        className="w-full my-3.5 rounded-xl"
        onClick={handleUpdate}
        disabled={loading}
      >
        {loading ? "Updating..." : "Update profile"}
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
