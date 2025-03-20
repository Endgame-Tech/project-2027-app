import express from "express";
import { submitDemand, getDemands } from "../controllers/citizenDemandController.js";


const router = express.Router();

// ✅ SUBMIT a citizen's demand
router.post("/submit", submitDemand);

// ✅ FETCH all past demands
router.get("/all", getDemands);

export default router;
