import { AxiosUtility, PrivateAxiosUtility } from "./api";

export const loginUser = async (email: string, password: string) => {
  const res = await AxiosUtility.post("/auth/login", {
    email,
    password,
  });
  return await res.data;
};

export const registerUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  const res = await AxiosUtility.post("/auth/register", {
    firstName,
    lastName,
    email,
    password,
  });
  return res.data;
};

export const updateProfile = async ({
  firstName,
  lastName,
  password,
}: {
  firstName: string;
  lastName: string;
  password: string;
}) => {
  const res = await PrivateAxiosUtility.patch("/auth/update", {
    firstName,
    lastName,
    ...(password && { password }), // Only include password if it's not empty
  });
  return res.data;
};
