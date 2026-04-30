import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import ReportDownload, { CATEGORY_OPTIONS } from "../models/reportDownload.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LOGO_URL = "https://mandate4.org/wp-content/uploads/2024/06/Mandate-4-Logo-01.png";

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

const buildEmailHTML = (name, downloadUrl, wantsCollaboration) => {
  const year = new Date().getFullYear();
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Your Mandate4 Report</title>
</head>
<body style="margin:0;padding:0;background-color:#f6f6f6;font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f6f6f6;">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <!-- Main Card -->
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background-color:#ffffff;border-radius:8px;border:1px solid #e8e8e8;">

          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px;text-align:center;border-bottom:1px solid #f0f0f0;">
              <img src="${LOGO_URL}" alt="Mandate4" width="160" style="display:block;margin:0 auto;max-width:160px;height:auto;">
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 40px 16px;">
              <p style="font-size:16px;color:#1C1C1C;line-height:1.7;margin:0 0 16px;">Dear ${name},</p>
              <p style="font-size:15px;color:#444;line-height:1.7;margin:0 0 16px;">Thank you for your interest in understanding democratic containment in Nigeria. Your copy of the full 59-page report is ready.</p>
              <p style="font-size:15px;color:#444;line-height:1.7;margin:0 0 28px;">Tap the button below to download it:</p>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td align="center" style="padding:0 40px 8px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius:6px;background-color:#0D5C3D;">
                    <a href="${downloadUrl}" target="_blank" style="display:inline-block;padding:14px 36px;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;letter-spacing:0.3px;">Download Your Report</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:12px 40px 24px;text-align:center;">
              <p style="font-size:12px;color:#999;margin:0;">This link expires in 48 hours. If it expires, you can <a href="${process.env.FRONTEND_URL || "http://localhost:3000"}/download" style="color:#0D5C3D;text-decoration:underline;">request a new one</a>.</p>
            </td>
          </tr>

          ${wantsCollaboration ? `
          <!-- Collaboration callout -->
          <tr>
            <td style="padding:0 40px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0faf4;border-radius:6px;">
                <tr>
                  <td style="padding:16px 20px;border-radius:6px;">
                    <p style="font-size:14px;color:#333;line-height:1.7;margin:0;">We noticed you're interested in working with us. Someone from our team will reach out within 3&#8211;5 business days to explore how we can collaborate.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>` : ""}

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="border-top:1px solid #f0f0f0;font-size:0;line-height:0;">&nbsp;</td></tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px 32px;text-align:center;">
              <p style="font-size:13px;color:#666;line-height:1.6;margin:0 0 8px;">Best regards,<br>The Mandate4 Team</p>
              <p style="font-size:12px;color:#aaa;line-height:1.5;margin:0 0 12px;">
                <a href="https://mandate4.org" style="color:#0D5C3D;text-decoration:none;">mandate4.org</a>
              </p>
              <p style="font-size:11px;color:#bbb;line-height:1.5;margin:0;">&#169; ${year} Mandate4. You received this email because you requested the Democratic Containment report.</p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;
};

const buildEmailText = (name, downloadUrl, wantsCollaboration) => {
  let text = `Dear ${name},

Thank you for your interest in understanding democratic containment in Nigeria. Your copy of the full 59-page report is ready.

Download your report here:
${downloadUrl}

This link expires in 48 hours. If it expires, you can request a new one at ${process.env.FRONTEND_URL || "http://localhost:3000"}/download
`;

  if (wantsCollaboration) {
    text += `
We noticed you're interested in working with us. Someone from our team will reach out within 3-5 business days to explore how we can collaborate.
`;
  }

  text += `
Best regards,
The Mandate4 Team
mandate4.org

You received this email because you requested the Democratic Containment report.`;

  return text;
};

export const requestReport = async (req, res) => {
  const { fullName, email, category, collaborationInterest, website } = req.body;

  // Honeypot check — bots fill this hidden field
  if (website) {
    return res.status(200).json({ success: true, message: "Report has been sent to your email." });
  }

  // Validate fullName
  if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
    return res.status(400).json({ message: "Full name is required (minimum 2 characters)." });
  }

  // Validate email
  if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
    return res.status(400).json({ message: "Please enter a valid email address." });
  }

  // Validate category
  if (!category || !CATEGORY_OPTIONS.includes(category)) {
    return res.status(400).json({ message: "Please select a valid category." });
  }

  // Validate collaborationInterest
  if (typeof collaborationInterest !== "boolean") {
    return res.status(400).json({ message: "Please indicate your collaboration interest." });
  }

  const sanitizedEmail = email.trim().toLowerCase();
  const sanitizedName = fullName.trim();

  try {
    // Check for duplicate request within 24 hours
    const recentRequest = await ReportDownload.findOne({
      email: sanitizedEmail,
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    });

    if (recentRequest) {
      return res.status(429).json({
        message: "A report was already sent to this email in the last 24 hours. Please check your inbox.",
      });
    }

    // Save to database
    const download = new ReportDownload({
      fullName: sanitizedName,
      email: sanitizedEmail,
      category,
      collaborationInterest,
    });
    await download.save();

    // Generate signed download token
    const token = jwt.sign(
      { email: sanitizedEmail, id: download._id.toString() },
      process.env.SECRET_KEY,
      { expiresIn: process.env.REPORT_TOKEN_EXPIRY || "48h" }
    );

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    const downloadUrl = `${frontendUrl}/download/verify?token=${token}`;

    // Send email with anti-spam headers
    const transporter = createTransporter();
    const emailResult = await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: sanitizedEmail,
      replyTo: "research@mandate4.org",
      subject: "Your Mandate4 Report on Democratic Containment in Nigeria",
      html: buildEmailHTML(sanitizedName, downloadUrl, collaborationInterest),
      text: buildEmailText(sanitizedName, downloadUrl, collaborationInterest),
      headers: {
        "List-Unsubscribe": "<mailto:unsubscribe@mandate4.org>",
      },
    });

    console.log(`[Report Email] ✅ Sent to ${sanitizedEmail} | MessageId: ${emailResult.messageId} | Response: ${emailResult.response}`);

    // Mark email as sent
    download.emailSent = true;
    await download.save();

    res.status(200).json({ success: true, message: "Report has been sent to your email." });
  } catch (error) {
    console.error("Error processing report request:", error);
    res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
};

export const downloadReport = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Update downloadedAt timestamp
    await ReportDownload.findByIdAndUpdate(decoded.id, { downloadedAt: new Date() });

    const pdfPath = path.join(__dirname, "..", "assets", "democratic-containment-report.pdf");

    if (!fs.existsSync(pdfPath)) {
      return res.status(404).json({ message: "Report file not found. Please contact support." });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="Mandate4-Democratic-Containment-Report.pdf"');

    const fileStream = fs.createReadStream(pdfPath);
    fileStream.pipe(res);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(410).json({ message: "This download link has expired. Please request a new one." });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid download link." });
    }
    console.error("Error downloading report:", error);
    res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const download = await ReportDownload.findById(decoded.id);

    if (!download) {
      return res.status(404).json({ valid: false, reason: "not_found" });
    }

    res.json({ valid: true, name: download.fullName });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(410).json({ valid: false, reason: "expired" });
    }
    return res.status(401).json({ valid: false, reason: "invalid" });
  }
};

export const getAllReportDownloads = async (req, res) => {
  try {
    const downloads = await ReportDownload.find().sort({ createdAt: -1 });
    const count = await ReportDownload.countDocuments();
    const collaborationCount = await ReportDownload.countDocuments({ collaborationInterest: true });

    res.json({ count, collaborationCount, downloads });
  } catch (error) {
    console.error("Error fetching report downloads:", error);
    res.status(500).json({ message: "Server error" });
  }
};
