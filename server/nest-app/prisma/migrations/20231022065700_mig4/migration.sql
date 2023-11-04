-- CreateTable
CREATE TABLE "Verification" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "try" INTEGER NOT NULL DEFAULT 0,
    "code" TEXT NOT NULL,
    "lastResendTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Verification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Verification_email_key" ON "Verification"("email");
