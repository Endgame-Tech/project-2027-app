import Petition from "../models/petition.model.js";

export const totalPetitionsSigned = async (req, res) => {
  try {
    const petitions = await Petition.find().sort({ createdAt: -1 }); // Get all petitions, newest first
    const count = await Petition.countDocuments(); // Count total petitions

    res.json({ count, petitions }); // Return both count and petition data
  } catch (error) {
    console.error("Error fetching petitions:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const signPetition = async (req, res) => {
  const {
    fullName,
    phone,
    email,
    sex,
    occupation,
    ageRange,
    isVoter,
    wantsPVC,
    state,
    lga,
    ward,
    wantsToVolunteer,
  } = req.body;

  if (!fullName ||
    !phone ||
    !email ||
    !sex ||
    !occupation ||
    !ageRange ||
    !isVoter ||
    !state ||
    !lga ||
    !ward ||
    !wantsToVolunteer) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the email is already in the database
    const existingUser = await Petition.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "This email has already signed the petition!" });
    }

    // If the email is new, save the petition
    const newPetition = new Petition({
      fullName,
      phone,
      email,
      sex,
      occupation,
      ageRange,
      isVoter,
      wantsPVC,
      state,
      lga,
      ward,
      wantsToVolunteer
    });
    await newPetition.save();
    res.status(201).json({ message: "Petition signed successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};