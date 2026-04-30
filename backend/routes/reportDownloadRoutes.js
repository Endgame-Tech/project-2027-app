import express from "express";
import rateLimit from "express-rate-limit";
import adminAuth from "../middleware/adminAuth.js";
import {
  requestReport,
  downloadReport,
  verifyToken,
  getAllReportDownloads,
} from "../controllers/reportDownloadController.js";

const router = express.Router();

// Rate limit: max 3 report requests per IP per hour
const reportRequestLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests. Please try again later." },
});

// POST: Request report download (public, rate-limited)
router.post("/request", reportRequestLimiter, requestReport);

// GET: Verify download token (public, used by frontend verify page)
router.get("/verify/:token", verifyToken);

// GET: Download report via signed token (public, token is auth)
router.get("/download/:token", downloadReport);

// GET: All report downloads (admin only)
router.get("/all", adminAuth, getAllReportDownloads);

export default router;
