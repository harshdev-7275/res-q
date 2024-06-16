import express from "express"
import {
    changeNotificationStatus,
   createNotification,
   getNotificationStatus,
   getNotifications
  } from "../controllers/adminController.js";

const router = express.Router();

router.post("/create/notification", createNotification)
router.post("/get/notifications",getNotifications)
router.post("/change/notification/status",changeNotificationStatus)
router.post("/get/notification",getNotificationStatus)



export default router