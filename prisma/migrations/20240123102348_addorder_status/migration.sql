-- CreateEnum
CREATE TYPE "orderStatus" AS ENUM ('Pending', 'On_The_Way', 'Complete');

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "OrderStatus" "orderStatus" NOT NULL DEFAULT 'Pending';
