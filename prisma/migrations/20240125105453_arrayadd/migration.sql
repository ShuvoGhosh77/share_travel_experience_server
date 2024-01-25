/*
  Warnings:

  - The `CoverageArea` column on the `guide` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "guide" DROP COLUMN "CoverageArea",
ADD COLUMN     "CoverageArea" TEXT[];
