"use client";
import useFetch from "@/app/hooks/use-fetch";
import { registerUser } from "@/app/services/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { toast } from "sonner";

const SignUp = () => {
  const { fn: createUser, loading, error } = useFetch(registerUser);

  const [request, setRequest] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  function handleRegisterUser() {
    createUser(
      request.firstName,
      request.lastName,
      request.email,
      request.password
    );
    if (!error) {
      toast.success("account created successfully");
    }
  }

  return (
    <div className="">
      <span className="flex  justify-center font-bold text-[1.8rem] my-2">
        Sign Up
      </span>

      <div className="flex flex-col gap-4 border p-10 rounded-md shadow-2xl">
        <div>
          <label>First Name</label>
          <Input
            name=""
            value={request.firstName}
            onChange={(e) =>
              setRequest({ ...request, firstName: e.target.value })
            }
            placeholder="First Name"
            className="w-[20rem] h-[2.5rem]"
          />
        </div>
        <div>
          <label>Last Name</label>
          <Input
            name=""
            placeholder="Last Name"
            className="w-[20rem] h-[2.5rem]"
            value={request.lastName}
            onChange={(e) =>
              setRequest({ ...request, lastName: e.target.value })
            }
          />
        </div>
        <div>
          <label>Email</label>
          <Input
            name=""
            type="email"
            placeholder="Email"
            className="w-[20rem] h-[2.5rem]"
            value={request.email}
            onChange={(e) => setRequest({ ...request, email: e.target.value })}
          />
        </div>
        <div>
          <label>Password</label>
          <Input
            name=""
            type="password"
            placeholder="Password"
            className="w-[20rem] h-[2.5rem]"
            value={request.password}
            onChange={(e) =>
              setRequest({ ...request, password: e.target.value })
            }
          />
        </div>

        <Button variant={"journal"} onClick={handleRegisterUser}>
          {loading ? "Signing up..." : "Continue"}
        </Button>
      </div>
    </div>
  );
};

export default SignUp;
