/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { loginUser } from "@/actions/auth";
import useFetch from "@/app/hooks/use-fetch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const SignIn = () => {
  const [request, setRequest] = useState({
    email: "",
    password: "",
  });

  const { data, loading, fn: login }: any = useFetch(loginUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(request.email, request.password);
  };

  // for navigation
  const router = useRouter();

  useEffect(() => {
    if (data?.success) {
      toast.success("success", { description: data?.message });
      router.push("/dashboard");
    }
  }, [data, router]);

  return (
    <div className="">
      <span className="flex  justify-center font-bold text-[1.8rem] my-2">
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
            value={request.email}
            onChange={(e) => setRequest({ ...request, email: e.target.value })}
            className="w-[25rem] h-[2.5rem]"
          />
        </div>
        <div>
          <label>Password</label>
          <Input
            type="text"
            value={request.password}
            onChange={(e) =>
              setRequest({ ...request, password: e.target.value })
            }
            placeholder="Last Name"
            className="w-[25rem] h-[2.5rem]"
          />
        </div>

        <Button type="submit" className="bg-orange-500">
          {loading ? "loggin in..." : "Continue"}
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
