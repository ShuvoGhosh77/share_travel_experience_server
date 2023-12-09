/*
  Warnings:

  - The `RoomImage` column on the `rooms` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "rooms" DROP COLUMN "RoomImage",
ADD COLUMN     "RoomImage" TEXT[];
