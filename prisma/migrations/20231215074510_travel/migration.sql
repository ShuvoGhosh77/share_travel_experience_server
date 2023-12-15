/*
  Warnings:

  - You are about to drop the column `adminReply` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the `customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reservation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rooms` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PostCatagory" AS ENUM ('Single', 'Double', 'Deluxe', 'Honeymoon_Package', 'Family_Package');

-- DropForeignKey
ALTER TABLE "reservation" DROP CONSTRAINT "reservation_CustomerID_fkey";

-- DropForeignKey
ALTER TABLE "reservation" DROP CONSTRAINT "reservation_RoomNumberID_fkey";

-- AlterTable
ALTER TABLE "comment" DROP COLUMN "adminReply";

-- DropTable
DROP TABLE "customer";

-- DropTable
DROP TABLE "reservation";

-- DropTable
DROP TABLE "rooms";

-- DropEnum
DROP TYPE "RoomStatus";

-- DropEnum
DROP TYPE "RoomTypeStatus";
