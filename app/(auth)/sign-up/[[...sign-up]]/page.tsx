import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const SignUp = () => {
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
            placeholder="First Name"
            className="w-[28rem] h-[2.5rem]"
          />
        </div>
        <div>
          <label>Last Name</label>
          <Input
            name=""
            placeholder="Last Name"
            className="w-[28rem] h-[2.5rem]"
          />
        </div>
        <div>
          <label>Email</label>
          <Input
            name=""
            placeholder="Last Name"
            className="w-[28rem] h-[2.5rem]"
          />
        </div>
        <div>
          <label>Password</label>
          <Input
            name=""
            placeholder="Last Name"
            className="w-[28rem] h-[2.5rem]"
          />
        </div>

        <Button>Continue</Button>
      </div>
    </div>
  );
};

export default SignUp;
