-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('Panding', 'Rejected', 'Success');

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "Status" "PostStatus" NOT NULL DEFAULT 'Panding';
