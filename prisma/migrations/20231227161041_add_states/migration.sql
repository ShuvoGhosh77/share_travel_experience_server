-- CreateEnum
CREATE TYPE "GuideStatus" AS ENUM ('Available', 'Booked');

-- AlterTable
ALTER TABLE "guide" ADD COLUMN     "Status" "GuideStatus" NOT NULL DEFAULT 'Available';
