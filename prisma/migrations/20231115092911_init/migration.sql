-- CreateEnum
CREATE TYPE "RoomStatus" AS ENUM ('Available', 'Booked');

-- CreateEnum
CREATE TYPE "RoomTypeStatus" AS ENUM ('Single', 'Double', 'Deluxe');

-- CreateTable
CREATE TABLE "rooms" (
    "id" TEXT NOT NULL,
    "RoomNumber" TEXT NOT NULL,
    "RoomType" "RoomTypeStatus" NOT NULL,
    "PricePerNight" INTEGER NOT NULL,
    "Description" TEXT NOT NULL,
    "Capacity" TEXT NOT NULL,
    "Status" "RoomStatus" NOT NULL DEFAULT 'Available',
    "Facilities" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
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
    "Adults" INTEGER NOT NULL,
    "Children" INTEGER NOT NULL,
    "TotalCost" INTEGER NOT NULL,
    "TotalRoomNumber" INTEGER NOT NULL,
    "CustomerID" TEXT NOT NULL,
    "RoomNumberID" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "PostTitle" TEXT NOT NULL,
    "PostDescription" TEXT NOT NULL,
    "PostImage" TEXT NOT NULL,
    "PostDate" TEXT NOT NULL,
    "AuthorImage" TEXT NOT NULL,
    "AuthorName" TEXT NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment" (
    "id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Comments" TEXT NOT NULL,
    "PostId" TEXT NOT NULL,
    "adminReply" TEXT,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rooms_RoomNumber_key" ON "rooms"("RoomNumber");

-- CreateIndex
CREATE UNIQUE INDEX "customer_Email_key" ON "customer"("Email");

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_CustomerID_fkey" FOREIGN KEY ("CustomerID") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_RoomNumberID_fkey" FOREIGN KEY ("RoomNumberID") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_PostId_fkey" FOREIGN KEY ("PostId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
