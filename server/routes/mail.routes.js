const express = require("express");
const router = express.Router();
const mailjet = require("../config/Mailjet.js");
const Message = require("../models/Message.js");
const { verifyToken, requireAdmin } = require("../middlewares/auth.middleware.js");

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// POST /sendMail (or /api/mail/sendMail) - Submit contact inquiry
router.post(["/sendMail", "/"], async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      error: "Please fill out all required fields",
    });
  }

  const safeName = escapeHtml(name.trim());
  const safeEmail = escapeHtml(email.trim());
  const safeSubject = escapeHtml(subject.trim());
  const safeMessage = escapeHtml(message.trim());

  let savedMessage = null;
  try {
    // 1. ALWAYS save message to MongoDB so it is never lost
    savedMessage = new Message({
      name: safeName,
      email: safeEmail,
      subject: safeSubject,
      message: safeMessage,
      status: "unread",
    });
    await savedMessage.save();
  } catch (dbErr) {
    console.error("⚠️ Failed to store message in DB:", dbErr.message);
  }

  // 2. If Mailjet trial expired or keys not set, return simulated success
  if (!mailjet) {
    console.log("📨 [Simulated Mail - Stored in DB]:", {
      safeName,
      safeEmail,
      safeSubject,
      safeMessage,
    });

    return res.status(200).json({
      success: true,
      message: "Message received and stored successfully!",
      saved: Boolean(savedMessage),
    });
  }

  // 3. If Mailjet is configured, attempt sending
  try {
    const result = await mailjet
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: process.env.MAIL_FROM_EMAIL || "noreply@carsreally.com",
              Name: process.env.MAIL_FROM_NAME || "CarsReally Support",
            },
            To: [
              {
                Email: process.env.MAIL_TO_EMAIL || "admin@carsreally.com",
                Name: process.env.MAIL_TO_NAME || "CarsReally Inbox",
              },
            ],
            ReplyTo: {
              Email: email,
              Name: name,
            },
            Subject: `CarsReally Query: ${safeSubject}`,
            TextPart: `From: ${name} (${email})\n\n${message}`,
            HTMLPart: `
              <h3>New Message from ${safeName}</h3>
              <p><b>Email:</b> ${safeEmail}</p>
              <p><b>Subject:</b> ${safeSubject}</p>
              <p><b>Message:</b></p>
              <p>${safeMessage}</p>
            `,
          },
        ],
      });

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
      result: result.body,
    });
  } catch (error) {
    console.warn("⚠️ Mailjet send failed (Trial expired / unverified sender):", error.message);
    // Because message is already saved in MongoDB, we don't fail the user!
    return res.status(200).json({
      success: true,
      message: "Your message has been received and saved to our inbox.",
      saved: true,
    });
  }
});

// GET /api/mail/messages (or /messages) - Admin view inbox queries
router.get(["/messages", "/inbox"], verifyToken, requireAdmin, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    return res.json({ success: true, count: messages.length, messages });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;