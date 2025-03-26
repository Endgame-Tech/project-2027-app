import mongoose from "mongoose";
import fs from "fs";
import csv from "csv-parser";
import dotenv from "dotenv";
import Petition from "./models/petition.model.js"; // Ensure the path is correct

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const csvFilePath = "./FIXINEC - Sheet1.csv"; // Ensure the correct path
const petitions = [];

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on("data", (row) => {
    petitions.push({
      fullName: row["Full Name"] || "Anonymous", // Default name if missing
      phone: row["Phone"] || "N/A", // Default if phone is missing
      email: row["Email"] || "no-email@example.com", // Default email
      sex: row["Gender"] || "Not Specified",
      occupation: row["Occupation"] || "Not Specified",
      ageRange: row["Age Range"] || "Unknown",
      isVoter: row["Registered Voter"] || "No",
      wantsPVC: row["Do you want to get a PVC?"] || "No",
      state: row["State"] || "Unknown",
      lga: row["LGA"] || "Unknown",
      ward: row["Ward"] || "Unknown",
      wantsToVolunteer: row["Volunteer Interest"] || "No",
      vendor: "Physical Outreach", // Label these manually collected petitions
      signedAt: new Date(), // Use current timestamp
    });
  })
  .on("end", async () => {
    try {
      await Petition.insertMany(petitions);
      console.log("✅ Petition data uploaded successfully!");
      mongoose.connection.close();
    } catch (error) {
      console.error("Error inserting petitions:", error);
    }
  });
