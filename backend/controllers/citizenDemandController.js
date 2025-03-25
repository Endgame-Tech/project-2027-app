import CitizenDemand from "../models/citizenDemand.model.js"

export const submitDemand = async (req, res) => {
  try {
    const {
      personalInfo,
      keyIssues,
      infrastructureNeeds,
      governmentAssistance,
      electoralEngagement,
      agreedToPrivacy,
    } = req.body;

    if (!personalInfo || !keyIssues || !infrastructureNeeds || !governmentAssistance || !electoralEngagement || !agreedToPrivacy) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newDemand = new CitizenDemand({
      personalInfo,
      keyIssues,
      infrastructureNeeds,
      governmentAssistance,
      electoralEngagement,
      agreedToPrivacy,
    });

    await newDemand.save();
    res.status(201).json({ message: "Citizen demand submitted successfully!", demand: newDemand });
  } catch (error) {
    console.error("Error saving demand:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getDemands = async (req, res) => {
  try {
    const demands = await CitizenDemand.find().sort({ submittedAt: -1 }); // Latest first
    const count = await CitizenDemand.countDocuments();
    res.status(200).json({ demands, count });
  } catch (error) {
    console.error("Error fetching demands:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};