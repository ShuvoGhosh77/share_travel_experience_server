/*
  Warnings:

  - You are about to drop the column `Address` on the `reservation` table. All the data in the column will be lost.
  - You are about to drop the column `Email` on the `reservation` table. All the data in the column will be lost.
  - You are about to drop the column `FullName` on the `reservation` table. All the data in the column will be lost.
  - You are about to drop the column `Phone` on the `reservation` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "reservation_Email_key";

-- AlterTable
ALTER TABLE "reservation" DROP COLUMN "Address",
DROP COLUMN "Email",
DROP COLUMN "FullName",
DROP COLUMN "Phone";
