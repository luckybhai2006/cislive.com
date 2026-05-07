// routes/demoRoutes.js

import express from "express";
import { createDemoRequest, getAllDemos, deletedDemo } from "../controllers/demoController.js";

const router = express.Router();

router.post("/demo-request", createDemoRequest);    // POST
router.get("/demo-request", getAllDemos);    // GET ✅
router.delete("/demo-request/:id", deletedDemo); // ✅ DELETE endpoint

export default router;