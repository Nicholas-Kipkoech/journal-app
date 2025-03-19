import { getMoodById } from "@/app/lib/moods";
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, collectionId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "No user ID provided" },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({ where: { id: userId } });

    if (!user) {
      return NextResponse.json({ error: "No user found" }, { status: 404 });
    }

    const where = {
      userId: user.id,
      ...(collectionId === "unorganized"
        ? { collectionId: null }
        : collectionId
        ? { collectionId }
        : {}),
    };

    const entries = await db.journalEntry.findMany({
      where,
      include: { collection: { select: { id: true, name: true } } },
      orderBy: { createdAt: "desc" },
    });

    const entriesWithMoods = entries.map((entry) => ({
      ...entry,
      mood: getMoodById(entry.mood),
    }));

    return NextResponse.json({
      message: "Journals fetched successfully",
      data: { entries: entriesWithMoods },
    });
  } catch (error) {
    console.error("Error fetching journals:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
