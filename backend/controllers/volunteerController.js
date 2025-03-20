import Volunteer from "../models/volunteer.model.js";
import nodemailer from "nodemailer";

// ✅ Mailtrap Email Configuration
const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER, // Add in .env
    pass: process.env.MAILTRAP_PASS, // Add in .env
  }
});

// ✅ Register a new volunteer
export const registerVolunteer = async (req, res) => {
  try {
    const {
      interest, priorExperience, votersCard, fullName, email,
      phone, state, lga, ward, trainingWillingness
    } = req.body;

    // Ensure all required fields are present
    if (!interest || !priorExperience || !votersCard || !fullName || !email ||
        !phone || !state || !lga || !ward || !trainingWillingness) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Save volunteer to the database
    const newVolunteer = new Volunteer({
      interest, priorExperience, votersCard, fullName, email,
      phone, state, lga, ward, trainingWillingness
    });

    await newVolunteer.save();

    // ✅ Send confirmation email
    const mailOptions = {
      from: '"Project 2027" <noreply@project2027.com>',
      to: email,
      subject: "Volunteer Registration Confirmation",
      text: `Hello ${fullName},\n\nThank you for signing up as a ${interest}! 
      We will keep you updated regarding training and next steps.\n\nBest,\nProject 2027 Team`
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Volunteer registered successfully!" });

  } catch (error) {
    console.error("Error registering volunteer:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Fetch all registered volunteers
export const getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ submittedAt: -1 });
    res.status(200).json(volunteers);
  } catch (error) {
    console.error("Error fetching volunteers:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
