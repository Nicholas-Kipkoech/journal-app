"use client";
import useFetch from "@/app/hooks/use-fetch";
import { registerUser } from "@/app/services/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
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
    if (error === null) {
      toast.success("Account created successfully");
    }
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-4 gap-10">
      {/* Image Section */}
      <div className="hidden md:block w-1/2">
        <Image
          src="https://img.freepik.com/free-photo/colorful-overloaded-bullet-journal_23-2150248154.jpg?t=st=1742735876~exp=1742739476~hmac=560df9a4b4fb313021dcda8790aa52a389716f51a25e1c6a3222902894fbee67&w=740"
          alt="Journal Wallpaper"
          height={500}
          width={500}
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex flex-col items-center">
        <span className="font-bold text-[1.8rem] my-2">Sign Up</span>

        <div className="flex flex-col gap-4 border p-10 rounded-md shadow-2xl w-full max-w-[400px]">
          <div>
            <label>First Name</label>
            <Input
              value={request.firstName}
              onChange={(e) =>
                setRequest({ ...request, firstName: e.target.value })
              }
              placeholder="First Name"
              className="w-full h-[2.5rem]"
            />
          </div>
          <div>
            <label>Last Name</label>
            <Input
              placeholder="Last Name"
              className="w-full h-[2.5rem]"
              value={request.lastName}
              onChange={(e) =>
                setRequest({ ...request, lastName: e.target.value })
              }
            />
          </div>
          <div>
            <label>Email</label>
            <Input
              type="email"
              placeholder="Email"
              className="w-full h-[2.5rem]"
              value={request.email}
              onChange={(e) =>
                setRequest({ ...request, email: e.target.value })
              }
            />
          </div>
          <div>
            <label>Password</label>
            <Input
              type="password"
              placeholder="Password"
              className="w-full h-[2.5rem]"
              value={request.password}
              onChange={(e) =>
                setRequest({ ...request, password: e.target.value })
              }
            />
          </div>

          <Button variant={"journal"} onClick={handleRegisterUser}>
            {loading ? "Signing up..." : "Continue"}
          </Button>

          <div className="flex justify-center text-[13px] gap-1">
            <p>Already have an account?</p>
            <Link
              href={"/sign-in"}
              className="cursor-pointer text-blue-600 font-bold"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
