import express from "express";
router.post("/api/notify", extractUserId, async (req, res) => {
  const { area, message } = req.body;

  try {
    // Retrieve ambulance profile ID based on user ID
    const ambulanceProfile = await prisma.ambulanceProfile.findFirst({
      where: { userId: req.userId },
    });

    if (!ambulanceProfile) {
      return res.status(404).json({ error: "Ambulance profile not found" });
    }

    const ambulanceProfileId = ambulanceProfile.id;

    // Retrieve traffic profiles in the specified area
    const trafficProfiles = await prisma.trafficProfile.findMany({
      where: {
        area: area,
      },
      select: {
        userId: true, // Select only userId
      },
    });

    const notifications = trafficProfiles.map((trafficProfile) => {
      return prisma.notification.create({
        data: {
          message: message,
          ambulanceProfile: {
            connect: { id: ambulanceProfileId },
          },
          trafficProfile: {
            connect: { id: trafficProfile.userId }, // Connect using userId
          },
        },
      });
    });

    await Promise.all(notifications);
    console.log("Notifications created for traffic profiles in area:", area);

    res.status(200).json({ message: "Notifications sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send notifications" });
  }
});

// Endpoint to update notification status
router.post("/api/notification/response", async (req, res) => {
  const { notificationId, status } = req.body;

  try {
    // Update notification status in the database
    await prisma.notification.update({
      where: { id: notificationId },
      data: { status: status },
    });

    // Send a success response
    res
      .status(200)
      .json({ message: "Notification status updated successfully" });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Failed to update notification status" });
  }
});

// Fetch notifications for ambulance profiles
router.get("/api/ambulance/notifications", async (req, res) => {
  const ambulanceProfileId = req.userId; // Retrieve ambulance profile ID from user ID

  try {
    const notifications = await prisma.notification.findMany({
      where: { ambulanceProfileId: ambulanceProfileId },
    });
    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

// Fetch notifications for traffic profiles
router.get("/api/notifications", async (req, res) => {
  const trafficProfileId = req.userId; // Retrieve traffic profile ID from user ID

  try {
    const notifications = await prisma.notification.findMany({
      where: { trafficProfileId: trafficProfileId },
    });
    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});
export default router;
