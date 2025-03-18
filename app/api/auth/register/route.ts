import { db } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

// Define validation schema with zod

const registerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters long"),
  lastName: z.string().min(2, "Last name must be at least 2 characters long"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = registerSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.format() },
        { status: 400 }
      );
    }
    const { firstName, lastName, email, password } = result.data;

    // check if user already exists

    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "user already exists!" },
        { status: 409 }
      );
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // create new user
    const newUser = await db.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });
    return NextResponse.json(
      {
        message: "User registration success",
        userId: newUser.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("registration error", error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
