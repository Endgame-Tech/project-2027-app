import express from "express";
import { registerVolunteer, getAllVolunteers } from "../controllers/volunteerController.js";

const router = express.Router();

// Route to register a new volunteer
router.post("/register", registerVolunteer);

// Route to fetch all registered volunteers
router.get("/all", getAllVolunteers);

export default router;
