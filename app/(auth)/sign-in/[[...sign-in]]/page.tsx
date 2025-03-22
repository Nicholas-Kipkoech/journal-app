/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { loginUser } from "@/app/services/auth";
import useFetch from "@/app/hooks/use-fetch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { TokenPayload, useAuth } from "@/app/context/AuthContext";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";

const SignIn = () => {
  const [request, setRequest] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { data, loading, fn: login }: any = useFetch(loginUser);
  const { setAuth } = useAuth(); // Access Auth Context
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(request.email, request.password);
  };

  useEffect(() => {
    if (data?.token) {
      toast.success("Success", { description: "Logged in successfully" });

      localStorage.setItem("access_token", data.token);

      // Decode token & update Auth Context
      const decodedUser: TokenPayload = jwtDecode(data.token);
      setAuth({
        isAuthenticated: true,
        user: decodedUser.user,
        token: data.token,
      });

      // Navigate to dashboard
      router.push("/dashboard");
    }
  }, [data, router, setAuth]);

  return (
    <div className="">
      <span className="flex justify-center font-bold text-[1.8rem] my-2">
        Sign In
      </span>

      <form
        className="flex flex-col gap-4 border p-10 mx-auto rounded-md shadow-2xl"
        onSubmit={handleSubmit}
      >
        <div>
          <label>Email</label>
          <Input
            type="email"
            placeholder="Email"
            required
            value={request.email}
            onChange={(e) => setRequest({ ...request, email: e.target.value })}
            className="w-[20rem] h-[2.5rem]"
          />
        </div>
        <div>
          <label>Password</label>
          <Input
            type={showPassword ? "text" : "password"}
            required
            value={request.password}
            onChange={(e) =>
              setRequest({ ...request, password: e.target.value })
            }
            placeholder="Password"
            className="w-[20rem] h-[2.5rem]"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <p className="text-[13px]">Show password</p>
        </div>

        <Button type="submit" variant={"journal"}>
          {loading ? "Logging in..." : "Continue"}
        </Button>

        <div className="flex text-[13px] justify-center gap-1">
          <p>Dont have an account yet?</p>
          <Link
            href={"/sign-up"}
            className="text-blue-600 font-bold cursor-pointer"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
