/*
  Warnings:

  - You are about to drop the `Gallery` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Gallery";

-- CreateTable
CREATE TABLE "gallery" (
    "id" TEXT NOT NULL,
    "ImageUrl" TEXT NOT NULL,
    "Location" TEXT NOT NULL,
    "SpecialNote" TEXT,
    "PhotoAuthorName" TEXT NOT NULL,

    CONSTRAINT "gallery_pkey" PRIMARY KEY ("id")
);
