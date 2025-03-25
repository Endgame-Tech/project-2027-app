import express from "express";
import { registerAdvocacyEvent, totalAdvocacyEvents } from "../controllers/advocacyEventController.js";

const router = express.Router();

// POST: Register for Advocacy Event
router.post("/register", registerAdvocacyEvent);

router.get("/all", totalAdvocacyEvents);

export default router;
