/*
  Warnings:

  - Added the required column `TotalMember` to the `reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reservation" ADD COLUMN     "TotalMember" INTEGER NOT NULL;
