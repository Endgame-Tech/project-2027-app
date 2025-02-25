import mongoose from "mongoose";

const CitizenDemandSchema = new mongoose.Schema({
  personalInfo: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    state: { type: String, required: true },
    lga: { type: String, required: true },
    community: { type: String, required: false },
    ageRange: { type: String, required: true },
    gender: { type: String, required: true },
    occupation: { type: String, required: true },
    otherOccupation: { type: String }, // Only if "Other" is selected
  },

  keyIssues: {
    topIssues: [{ type: String, required: true }], // At least 3 issues
    governmentLevel: [{ type: String, required: true }],
    specificActions: { type: String, required: true },
  },

  infrastructureNeeds: {
    neededInfrastructure: [{ type: String, required: true }],
    specificProblem: { type: String, required: true },
  },

  governmentAssistance: {
    assistanceTypes: [{ type: String, required: true }],
    directImprovement: { type: String, required: true },
  },

  electoralEngagement: {
    engagedBefore: { type: String, required: true }, // Yes/No
    preferredEngagement: [{ type: String, required: true }],
    futureParticipation: { type: String, required: true }, // Yes/No
    additionalComments: { type: String },
  },

  agreedToPrivacy: { type: Boolean, required: true }, // Must be checked
  submittedAt: { type: Date, default: Date.now }, // Store submission time
});

export default mongoose.model("CitizenDemand", CitizenDemandSchema);
