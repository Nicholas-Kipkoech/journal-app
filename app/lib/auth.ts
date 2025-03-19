// lib/auth.ts
import { db } from "@/lib/prisma";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

interface TokenPayload extends JwtPayload {
  userId: string;
  email: string;
}

export async function verifyAuthToken() {
  const secret = process.env.JWT_SECRET;
  const cookieStore = cookies();
  const token = (await cookieStore).get("accessToken")?.value;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  if (!token) {
    throw new Error("Unauthorized");
  }

  try {
    const decoded = jwt.verify(token, secret) as TokenPayload;
    const user = await db.user.findUnique({ where: { id: decoded.userId } });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("Invalid token");
  }
}
