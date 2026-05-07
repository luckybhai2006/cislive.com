// routes/contactRoutes.js

import express from "express";
import { createContact, getAllContacts, deleteContact } from "../controllers/contactController.js";

const router = express.Router();

router.post("/contact", createContact);      // POST
router.get("/contact", getAllContacts);      // GET ✅
router.delete("/contact/:id", deleteContact); // ✅ DELETE endpoint

export default router;