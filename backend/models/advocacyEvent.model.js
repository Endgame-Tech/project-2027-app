import mongoose from "mongoose";

const AdvocacyEventSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  registeredAt: { type: Date, default: Date.now },
});

export default mongoose.model("AdvocacyEvent", AdvocacyEventSchema);
