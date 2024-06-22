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
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);

// Endpoint to handle notification from AmbulanceDashboard
app.post("/api/send-notification", async (req, res) => {
  const { area, message } = req.body;

  try {
    // Find all traffic users associated with the selected area
    const trafficUsers = await prisma.user.findMany({
      where: {
        role: "TRAFFIC",
        trafficProfile: {
          area: area,
        },
      },
      include: {
        trafficProfile: true,
      },
    });

    // Send notifications to each traffic user
    for (const user of trafficUsers) {
      // You can implement your notification sending logic here
      console.log(`Sending notification to ${user.email}`);
    }

    res.status(200).json({ message: "Notifications sent successfully." });
  } catch (error) {
    console.error("Error sending notifications:", error);
    res.status(500).json({ error: "Failed to send notifications." });
  }

  app.get("/api/notifications", async (req, res) => {
    try {
      // Retrieve all notifications from the database
      const notifications = await prisma.notification.findMany({
        include: {
          ambulanceProfile: true,
          trafficProfile: true,
        },
      });

      res.status(200).json(notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ error: "Failed to fetch notifications." });
    }
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
