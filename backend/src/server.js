import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client"; // Import PrismaClient
import jwt from "jsonwebtoken"; // Import JWT library

import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const prisma = new PrismaClient(); // Initialize PrismaClient

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Middleware to extract user ID from JWT token
const extractUserId = (req, res, next) => {
  const token = req.cookies.token; // Assuming token is stored in a cookie named 'token'

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId; // Store user ID in request object
    } catch (error) {
      console.error("Invalid token:", error);
      req.userId = null; // Set userId to null if token is invalid
    }
  } else {
    req.userId = null; // Set userId to null if token is not present
  }

  next();
};

app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);

app.post("/api/notify", extractUserId, async (req, res) => {
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
app.post("/api/notification/response", async (req, res) => {
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
app.get("/api/ambulance/notifications", async (req, res) => {
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
app.get("/api/notifications", async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
