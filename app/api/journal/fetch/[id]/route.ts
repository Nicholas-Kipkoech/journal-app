import { getPixabayImage } from "@/actions/public";
import { MOODS } from "@/app/lib/moods";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// get a journal by ID

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { userId } = await req.json();

    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new Error("User not found");

    const entry = await db.journalEntry.findFirst({
      where: { id: id, userId: user.id },
      include: {
        collection: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!entry) {
      return NextResponse.json({ message: "no entry found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Entry fetched success", data: entry });
  } catch (error) {
    console.error("error getting journal by id", error);
    return NextResponse.json(
      { error: "Error getting journal by id" },
      { status: 500 }
    );
  }
}

// update journal by ID

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { userId, mood, moodQuery, title, content, collectionId } =
      await req.json();

    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new Error("User not found");

    // Check if entry exists and belongs to user
    const existingEntry = await db.journalEntry.findFirst({
      where: {
        id: id,
        userId: user.id,
      },
    });
    // Get mood data
    const moodKey = mood.toUpperCase() as keyof typeof MOODS;
    const _mood = MOODS[moodKey];

    // update mood image if mood changes

    let moodImageUrl = existingEntry?.moodImageUrl;
    if (existingEntry?.mood !== _mood.id) {
      moodImageUrl = await getPixabayImage(moodQuery);
    }

    const updatedEntry = await db.journalEntry.update({
      where: { id },
      data: {
        title: title,
        content: content,
        mood: mood.id,
        moodScore: mood.score,
        moodImageUrl,
        collectionId: collectionId || null,
      },
    });
    revalidatePath("/dashboard");
    revalidatePath(`/journal/${id}`);
    return NextResponse.json({ data: { entry: updatedEntry } });
  } catch (error) {
    console.error("error updating journal by id", error);
    return NextResponse.json(
      { error: "Error updating journal by id" },
      { status: 500 }
    );
  }
}

// delete entry by id

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { userId } = await req.json();

    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new Error("User not found");

    // Check if entry exists and belongs to user
    const existingEntry = await db.journalEntry.findFirst({
      where: {
        id: id,
        userId: user.id,
      },
    });

    if (!existingEntry) {
      return NextResponse.json({ message: "entry not found" });
    }
    await db.journalEntry.delete({ where: { id } });
    revalidatePath("/dashboard");

    return NextResponse.json({ message: "entry deleted success" });
  } catch (error) {
    console.error("error updating journal by id", error);
    return NextResponse.json(
      { error: "Error updating journal by id" },
      { status: 500 }
    );
  }
}
