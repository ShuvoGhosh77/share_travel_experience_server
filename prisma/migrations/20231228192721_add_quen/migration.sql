/*
  Warnings:

  - You are about to drop the column `quentity` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "quentity",
ADD COLUMN     "quantity" INTEGER;
