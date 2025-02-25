import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import petitionRoutes from "./routes/petitionRoutes.js";
import advocacyEventRoutes from "./routes/advocacyEventRoutes.js";
import evaluationRoutes from "./routes/evaluationRoutes.js";
import citizenDemandRoutes from "./routes/citizenDemandRoutes.js";

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
const FRONTEND_URL = process.env.VITE_FRONTEND_URL || "http://localhost:5173"; // Default for local dev

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/petition", petitionRoutes);
app.use("/api/advocacy", advocacyEventRoutes);
app.use("/api/evaluation", evaluationRoutes);
app.use("/api/demands", citizenDemandRoutes);

app.get("/", (req, res) => {
  res.send("Project 2027 Backend is Running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
