import mongoose from "mongoose";

const CATEGORY_OPTIONS = [
  "#EndSARS Protesters",
  "2023 Voters",
  "Electoral Reform Advocates",
  "International Donors",
  "Civil Society Leaders",
  "Nigerian Diaspora",
  "Young Nigerians (18-35)",
  "Journalists & Media",
  "Values-Based Political Class",
  "Business Leaders & Private Sector",
];

const ReportDownloadSchema = new mongoose.Schema({
  fullName: { type: String, required: true, minlength: 2, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  category: { type: String, required: true, enum: CATEGORY_OPTIONS },
  collaborationInterest: { type: Boolean, required: true },
  emailSent: { type: Boolean, default: false },
  downloadedAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
});

export { CATEGORY_OPTIONS };
export default mongoose.model("ReportDownload", ReportDownloadSchema);
