import express from "express";
import {
  getAdminNotificationState,
  putAdminNotificationState,
  clearAllNotifications, // 🆕 NEW
  markAllRead, // 🆕 NEW
} from "../controllers/adminNotificationController.js";

const router = express.Router();

// Teri existing routes
router.get("/admin/notification-state", getAdminNotificationState);
router.put("/admin/notification-state", putAdminNotificationState);

// 🆕 NEW — Batch operations
router.post("/notifications/clear", clearAllNotifications);
router.post("/notifications/read", markAllRead);

export default router;
