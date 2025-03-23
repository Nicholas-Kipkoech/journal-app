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
import Image from "next/image";

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
    <div className="flex flex-col md:flex-row items-center justify-center p-4 gap-10">
      <div className="flex flex-col md:flex-row gap-10  items-center p-4 md:shadow-xl rounded-md">
        <div className="hidden md:block md:w-1/2 ">
          <Image
            src="https://img.freepik.com/free-photo/colorful-overloaded-bullet-journal_23-2150248154.jpg?t=st=1742735876~exp=1742739476~hmac=560df9a4b4fb313021dcda8790aa52a389716f51a25e1c6a3222902894fbee67&w=740"
            alt="Journal Wallpaper"
            height={500}
            width={500}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className=" w-full md:w-1/2 flex flex-col items-center md:bg-gradient-to-b from-[#32a2a8] to-white rounded-md md:p-5 p-2">
          <span className="flex justify-center font-bold text-[1.8rem] my-2">
            Sign In
          </span>

          <form
            className="flex flex-col gap-4 p-4 md:p-10  rounded-md w-full"
            onSubmit={handleSubmit}
          >
            <div>
              <label>Email</label>
              <Input
                type="email"
                placeholder="Email"
                required
                value={request.email}
                onChange={(e) =>
                  setRequest({ ...request, email: e.target.value })
                }
                className="w-full h-[2.5rem] bg-white"
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
                className="w-full h-[2.5rem] bg-white"
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
      </div>
    </div>
  );
};

export default SignIn;
