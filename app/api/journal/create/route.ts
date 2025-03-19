import { getPixabayImage } from "@/actions/public";
import { MOODS } from "@/app/lib/moods";
import { journalSchema } from "@/app/lib/schema";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate input
    const result = journalSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.format() },
        { status: 400 }
      );
    }
    const {
      title,
      content,
      collectionId,
      userId,
      moodQuery,
      mood: _mood,
    } = result.data;

    const user = await db.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new Error("User not found");
    }

    // get user moods
    const moodKey = _mood.toUpperCase() as keyof typeof MOODS;
    const mood = MOODS[moodKey];
    if (!mood) throw new Error("invalid mood");

    // get mood image from pixabay

    const moodImageUrl = await getPixabayImage(moodQuery);

    const newEntry = await db.journalEntry.create({
      data: {
        title,
        content,
        mood: mood.id,
        moodScore: mood.score,
        moodImageUrl: moodImageUrl,
        userId: user.id,
        collectionId,
      },
    });

    // cache the data
    revalidatePath("/journal");

    return NextResponse.json(newEntry, { status: 201 });
  } catch (error) {
    console.error("Error creating journal entry:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
