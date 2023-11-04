-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hashedRT" TEXT,
ADD COLUMN     "lastLoggedInTime" TIMESTAMP(3);
