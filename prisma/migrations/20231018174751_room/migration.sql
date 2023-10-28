-- CreateTable
CREATE TABLE "rooms" (
    "id" TEXT NOT NULL,
    "RoomNumber" TEXT NOT NULL,
    "RoomType" TEXT NOT NULL,
    "PricePerNight" INTEGER NOT NULL,
    "Description" TEXT NOT NULL,
    "Capacity" TEXT NOT NULL,
    "Facilities" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rooms_RoomNumber_key" ON "rooms"("RoomNumber");
