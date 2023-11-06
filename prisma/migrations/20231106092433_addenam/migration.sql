/*
  Warnings:

  - Changed the type of `RoomType` on the `rooms` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "RoomTypes" AS ENUM ('Single', 'Double', 'Duplex');

-- CreateEnum
CREATE TYPE "RoomStatus" AS ENUM ('Available', 'Booked');

-- AlterTable
ALTER TABLE "rooms" ADD COLUMN     "Status" "RoomStatus" NOT NULL DEFAULT 'Available',
DROP COLUMN "RoomType",
ADD COLUMN     "RoomType" "RoomTypes" NOT NULL;
