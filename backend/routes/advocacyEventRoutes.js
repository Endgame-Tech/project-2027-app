import express from "express";
import { registerAdvocacyEvent } from "../controllers/advocacyEventController.js";

const router = express.Router();

// POST: Register for Advocacy Event
router.post("/register", registerAdvocacyEvent);

export default router;
