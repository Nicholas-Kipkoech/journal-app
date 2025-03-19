/*
  Warnings:

  - Added the required column `mood` to the `JournalEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `moodScore` to the `JournalEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JournalEntry" ADD COLUMN     "mood" TEXT NOT NULL,
ADD COLUMN     "moodImageUrl" TEXT,
ADD COLUMN     "moodScore" INTEGER NOT NULL;
