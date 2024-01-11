/*
  Warnings:

  - You are about to drop the column `DeliveryCharge` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `Subtotal` on the `order` table. All the data in the column will be lost.
  - You are about to drop the `_OrderToProduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `deliveryCharge` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingAddress` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_OrderToProduct" DROP CONSTRAINT "_OrderToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderToProduct" DROP CONSTRAINT "_OrderToProduct_B_fkey";

-- AlterTable
ALTER TABLE "order" DROP COLUMN "DeliveryCharge",
DROP COLUMN "Subtotal",
ADD COLUMN     "deliveryCharge" INTEGER NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "paymentMethod" TEXT NOT NULL,
ADD COLUMN     "shippingAddress" TEXT NOT NULL,
ADD COLUMN     "subtotal" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "_OrderToProduct";

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" SERIAL NOT NULL,
    "product" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
