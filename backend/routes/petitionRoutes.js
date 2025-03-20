import express from "express";
import { signPetition, totalPetitionsSigned } from "../controllers/petitionController.js";

const router = express.Router();


// GET: Total number of signers
router.get("/count", totalPetitionsSigned);

// POST: Sign the petition
router.post("/sign-petition", signPetition);

export default router;
