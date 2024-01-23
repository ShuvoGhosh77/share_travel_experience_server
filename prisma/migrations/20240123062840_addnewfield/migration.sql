/*
  Warnings:

  - Added the required column `FullName` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Number` to the `user` table without a default value. This is not possible if the table is not empty.
  - Made the column `Role` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "FullName" TEXT NOT NULL,
ADD COLUMN     "Number" TEXT NOT NULL,
ALTER COLUMN "Role" SET NOT NULL;
