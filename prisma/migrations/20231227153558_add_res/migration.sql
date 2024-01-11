/*
  Warnings:

  - You are about to drop the `gallery` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('Pending', 'Complete');

-- DropTable
DROP TABLE "gallery";

-- CreateTable
CREATE TABLE "guide" (
    "id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "GuideImage" TEXT NOT NULL,
    "PricePerDay" INTEGER NOT NULL,
    "CoverageArea" TEXT NOT NULL,

    CONSTRAINT "guide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL,
    "ProductName" TEXT NOT NULL,
    "GuideImage" TEXT NOT NULL,
    "Price" INTEGER NOT NULL,
    "quentity" INTEGER,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer" (
    "id" TEXT NOT NULL,
    "FullName" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Phone" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservation" (
    "id" TEXT NOT NULL,
    "CheckInDate" TEXT NOT NULL,
    "CheckOutDate" TEXT NOT NULL,
    "TotalCost" INTEGER NOT NULL,
    "Payment" "PaymentStatus" NOT NULL DEFAULT 'Pending',
    "CustomerID" TEXT NOT NULL,
    "GuideID" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reservation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_CustomerID_fkey" FOREIGN KEY ("CustomerID") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_GuideID_fkey" FOREIGN KEY ("GuideID") REFERENCES "guide"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
