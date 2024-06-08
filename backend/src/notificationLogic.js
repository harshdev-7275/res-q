const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Function to send notification
async function sendNotification(userId, selectedArea) {
  // Find traffic profiles in the selected area
  const trafficProfiles = await prisma.trafficProfile.findMany({
    where: { area: selectedArea },
  });

  // Send notifications to all traffic profiles in the selected area
  for (const trafficProfile of trafficProfiles) {
    await prisma.notification.create({
      data: {
        message: `Ambulance needs assistance in your area: ${selectedArea}.`,
        status: "pending",
        trafficProfileId: trafficProfile.id,
      },
    });
  }

  console.log(
    `Notifications sent to traffic profiles in area: ${selectedArea}`
  );
}

module.exports = { sendNotification };
