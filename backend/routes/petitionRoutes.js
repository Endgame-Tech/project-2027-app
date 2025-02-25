import express from "express";
import Petition from "../models/petition.model.js";

const router = express.Router();

// GET: Total number of signers
router.get("/count", async (req, res) => {
  try {
    const count = await Petition.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST: Sign the petition
router.post("/sign-petition", async (req, res) => {
  const { firstName, lastName, email, phone, state, lga } = req.body;

  if (!firstName || !lastName || !email || !phone || !state || !lga) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the email is already in the database
    const existingUser = await Petition.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "This email has already signed the petition!" });
    }

    // If the email is new, save the petition
    const newPetition = new Petition({ firstName, lastName, email, phone, state, lga });
    await newPetition.save();
    res.status(201).json({ message: "Petition signed successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
