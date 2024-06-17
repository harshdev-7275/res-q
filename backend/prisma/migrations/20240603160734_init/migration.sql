/*
  Warnings:

  - A unique constraint covering the columns `[lat]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lng]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lat` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "lng" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "Bylat" DOUBLE PRECISION NOT NULL,
    "Bylng" DOUBLE PRECISION NOT NULL,
    "Tolat" DOUBLE PRECISION NOT NULL,
    "Tolng" DOUBLE PRECISION NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_lat_key" ON "User"("lat");

-- CreateIndex
CREATE UNIQUE INDEX "User_lng_key" ON "User"("lng");
