-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Role" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_Email_key" ON "user"("Email");
