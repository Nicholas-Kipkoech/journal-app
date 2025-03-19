import { verifyAuthToken } from "@/app/lib/auth";
import { collectionSchema } from "@/app/lib/schemas";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = collectionSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.format() },
        { status: 400 }
      );
    }

    const { userId, name, description } = result.data;

    // check if user exists
    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    // creat collection
    const collection = await db.collection.create({
      data: {
        name: name,
        userId: user.id,
        description: description,
      },
    });
    revalidatePath("/dashboard");
    return NextResponse.json({
      message: "collection added success",
      data: { collection: collection },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: `error creating collection` },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Access cookies from the request
    const user = await verifyAuthToken();

    // Fetch collections
    const collections = await db.collection.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" }, // optional sorting
    });

    return NextResponse.json({
      message: "Collections fetched successfully",
      data: collections,
    });
  } catch (error) {
    console.error("Error fetching collections:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { collectionId } = await req.json();

    const user = await verifyAuthToken();

    if (!collectionId) {
      return NextResponse.json(
        { error: "Collection ID is required" },
        { status: 400 }
      );
    }

    // Fetch collections

    const collection = await db.collection.findFirst({
      where: { id: collectionId },
    });

    if (!collection) {
      return NextResponse.json(
        { message: "Collection not found" },
        { status: 404 }
      );
    }

    await db.collection.delete({
      where: { id: collection.id, userId: user.id },
    });

    return NextResponse.json({
      message: "Collection deleted successfully",
    });
  } catch (error) {
    console.error("Error deleted collection:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
