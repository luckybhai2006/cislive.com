import express from "express";
import {
  getAdminNotificationState,
  putAdminNotificationState,
} from "../controllers/adminNotificationController.js";

const router = express.Router();

router.get("/admin/notification-state", getAdminNotificationState);
router.put("/admin/notification-state", putAdminNotificationState);

export default router;

