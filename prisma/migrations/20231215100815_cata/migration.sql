/*
  Warnings:

  - The values [Single,Double,Deluxe,Honeymoon_Package,Family_Package] on the enum `PostCatagory` will be removed. If these variants are still used in the database, this will fail.
  - Changed the type of `PostCategory` on the `posts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PostCatagory_new" AS ENUM ('Forest', 'River', 'Sea_beach', 'Mountain', 'Other');
ALTER TABLE "posts" ALTER COLUMN "PostCategory" TYPE "PostCatagory_new" USING ("PostCategory"::text::"PostCatagory_new");
ALTER TYPE "PostCatagory" RENAME TO "PostCatagory_old";
ALTER TYPE "PostCatagory_new" RENAME TO "PostCatagory";
DROP TYPE "PostCatagory_old";
COMMIT;

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "PostCategory",
ADD COLUMN     "PostCategory" "PostCatagory" NOT NULL;

-- CreateTable
CREATE TABLE "Gallery" (
    "id" TEXT NOT NULL,
    "ImageUrl" TEXT NOT NULL,
    "Location" TEXT NOT NULL,
    "SpecialNote" TEXT,
    "PhotoAuthorName" TEXT NOT NULL,

    CONSTRAINT "Gallery_pkey" PRIMARY KEY ("id")
);
