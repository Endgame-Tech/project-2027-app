import mongoose from "mongoose";

const VolunteerSchema = new mongoose.Schema({
  interest: { type: String, enum: ["Polling Unit Agent", "Citizen Vote Monitoring Officer"], required: true },
  priorExperience: { type: String, enum: ["Yes", "No"], required: true },
  votersCard: { type: String, enum: ["Yes", "No"], required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  state: { type: String, required: true },
  lga: { type: String, required: true },
  ward: { type: String, required: true },
  trainingWillingness: { type: String, enum: ["Yes", "No"], required: true },
  submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Volunteer", VolunteerSchema);
