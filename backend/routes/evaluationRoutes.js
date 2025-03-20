import express from "express";
import { submitEvaluation, getEvaluations } from "../controllers/evaluationController.js";

const router = express.Router();

// ✅ SUBMIT an evaluation
router.post("/submit", submitEvaluation);

// ✅ FETCH all past evaluations
router.get("/all", getEvaluations);

export default router;
