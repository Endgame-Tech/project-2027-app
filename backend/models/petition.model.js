import mongoose from "mongoose";

const PetitionSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: false },
  email: { type: String, required: false },
  sex: { type: String, required: false },
  occupation: { type: String, required: false },
  ageRange: { type: String, required: false },
  isVoter: { type: String, required: false },
  wantsPVC: { type: String, required: false },
  state: { type: String, required: false },
  lga: { type: String, required: false },
  ward: { type: String, required: false },
  wantsToVolunteer: { type: String, required: false },
  vendor: { type: String, required: true, default: "Unknown" }, // Default value
  signedAt: { type: Date, default: Date.now },
});


export default mongoose.model("Petition", PetitionSchema);
