-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'AMBULANCE', 'HOSPITAL', 'TAFFIC');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AmubulanceProfile" (
    "id" SERIAL NOT NULL,
    "phoneNumber" BIGINT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "AmubulanceProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HospitalProfile" (
    "id" SERIAL NOT NULL,
    "phoneNumber" BIGINT NOT NULL,
    "location" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "HospitalProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrafficProfile" (
    "id" SERIAL NOT NULL,
    "phoneNumber" BIGINT NOT NULL,
    "location" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "TrafficProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_password_key" ON "User"("password");

-- CreateIndex
CREATE UNIQUE INDEX "AmubulanceProfile_phoneNumber_key" ON "AmubulanceProfile"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "AmubulanceProfile_userId_key" ON "AmubulanceProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "HospitalProfile_phoneNumber_key" ON "HospitalProfile"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "HospitalProfile_userId_key" ON "HospitalProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "TrafficProfile_phoneNumber_key" ON "TrafficProfile"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "TrafficProfile_userId_key" ON "TrafficProfile"("userId");

-- AddForeignKey
ALTER TABLE "AmubulanceProfile" ADD CONSTRAINT "AmubulanceProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HospitalProfile" ADD CONSTRAINT "HospitalProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrafficProfile" ADD CONSTRAINT "TrafficProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
