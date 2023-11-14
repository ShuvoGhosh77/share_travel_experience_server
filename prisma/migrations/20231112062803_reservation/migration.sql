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
    "FullName" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Phone" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
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

-- CreateIndex
CREATE UNIQUE INDEX "customer_Email_key" ON "customer"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "reservation_Email_key" ON "reservation"("Email");

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_CustomerID_fkey" FOREIGN KEY ("CustomerID") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_RoomNumberID_fkey" FOREIGN KEY ("RoomNumberID") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
