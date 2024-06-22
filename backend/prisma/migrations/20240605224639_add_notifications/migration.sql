-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "trafficProfileId" INTEGER NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_trafficProfileId_fkey" FOREIGN KEY ("trafficProfileId") REFERENCES "TrafficProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
