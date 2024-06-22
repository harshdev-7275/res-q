/*
  Warnings:

  - The `status` column on the `Notification` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `ambulanceProfileId` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DENIED');

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "ambulanceProfileId" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "NotificationStatus" NOT NULL DEFAULT 'PENDING';

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_ambulanceProfileId_fkey" FOREIGN KEY ("ambulanceProfileId") REFERENCES "AmbulanceProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
