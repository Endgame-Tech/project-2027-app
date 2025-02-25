import mongoose from "mongoose";

const PetitionSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  state: { type: String, required: true },
  lga: { type: String, required: true },
  signedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Petition", PetitionSchema);
