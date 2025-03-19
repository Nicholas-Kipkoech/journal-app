import { z } from "zod";

export const journalSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  mood: z.string().min(1, "Mood is required"),
  collectionId: z.string(),
  moodScore: z.number().optional(),
  moodImageUrl: z.string().optional(),
  moodQuery: z.string(),
  userId: z.string(),
});

export const collectionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});
