/*
  Warnings:

  - Changed the type of `RoomType` on the `rooms` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "RoomTypeStatus" AS ENUM ('Single', 'Double', 'Deluxe');

-- AlterTable
ALTER TABLE "rooms" DROP COLUMN "RoomType",
ADD COLUMN     "RoomType" "RoomTypeStatus" NOT NULL;
