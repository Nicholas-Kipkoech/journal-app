import api from "./api";

export const loginUser = async (email: string, password: string) => {
  const res = await api.post("/auth/login", {
    email,
    password,
  });
  return await res.data;
};
