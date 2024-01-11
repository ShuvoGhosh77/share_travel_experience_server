/*
  Warnings:

  - Added the required column `PostCategory` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "PostCategory" TEXT NOT NULL;
