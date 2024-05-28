/*
  Warnings:

  - You are about to drop the `AmubulanceProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AmubulanceProfile" DROP CONSTRAINT "AmubulanceProfile_userId_fkey";

-- AlterTable
ALTER TABLE "HospitalProfile" ALTER COLUMN "phoneNumber" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "TrafficProfile" ALTER COLUMN "phoneNumber" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "AmubulanceProfile";

-- CreateTable
CREATE TABLE "AmbulanceProfile" (
    "id" SERIAL NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "AmbulanceProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AmbulanceProfile_phoneNumber_key" ON "AmbulanceProfile"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "AmbulanceProfile_userId_key" ON "AmbulanceProfile"("userId");

-- AddForeignKey
ALTER TABLE "AmbulanceProfile" ADD CONSTRAINT "AmbulanceProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
