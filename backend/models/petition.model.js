import mongoose from "mongoose";

const PetitionSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  sex: { type: String, required: true },
  occupation: { type: String, required: true },
  ageRange: {type: String, required: true},
  isVoter: {type: String, required: true},
  wantsPVC: { type: String },
  state: { type: String, required: true },
  lga: { type: String, required: true },
  ward: { type: String, required: true },
  wantsToVolunteer: { type: String, required: true },
  signedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Petition", PetitionSchema);
