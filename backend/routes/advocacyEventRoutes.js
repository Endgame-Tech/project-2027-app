import express from "express";
import AdvocacyEvent from "../models/advocacyEvent.model.js";

const router = express.Router();

// POST: Register for Advocacy Event
router.post("/register", async (req, res) => {
  const { fullName, email, phone } = req.body;

  if (!fullName || !email || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // ✅ Check if the email is already in the database
    const existingUser = await AdvocacyEvent.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "This email has already registered!" });
    }

    // ✅ Save to the database
    const newRegistration = new AdvocacyEvent({ fullName, email, phone });
    await newRegistration.save();

    // ✅ Redirect to Google Drive link after successful registration
    const guideUrl = process.env.ADVOCACY_GUIDE_URL;

    res.status(201).json({
      message: "Registration successful!",
      redirectUrl: guideUrl,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
