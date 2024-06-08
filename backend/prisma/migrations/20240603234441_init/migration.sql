/*
  Warnings:

  - Added the required column `area` to the `TrafficProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TrafficProfile" ADD COLUMN     "area" TEXT NOT NULL;
