import express from "express";
import Evaluation from "../models/evaluation.model.js";

const router = express.Router();

// ✅ SUBMIT an evaluation
router.post("/submit", async (req, res) => {
  try {
    const {
      assessor,
      candidate,
      scores,
      finalScore,
    } = req.body;

    // ✅ Validate required fields
    if (!assessor || !candidate || !scores || finalScore === undefined) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // ✅ Create a new evaluation record
    const newEvaluation = new Evaluation({
      assessor,
      candidate,
      scores,
      finalScore,
    });

    // ✅ Save to MongoDB
    await newEvaluation.save();

    res.status(201).json({ message: "Evaluation submitted successfully!", evaluation: newEvaluation });
  } catch (error) {
    console.error("Error saving evaluation:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ FETCH all past evaluations
router.get("/all", async (req, res) => {
  try {
    const evaluations = await Evaluation.find().sort({ createdAt: -1 }); // Latest first
    res.status(200).json(evaluations);
  } catch (error) {
    console.error("Error fetching evaluations:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
