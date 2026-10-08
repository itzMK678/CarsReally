// server/config/Mailjet.js
const Mailjet = require("node-mailjet");

let mailjet = null;

// Mailjet Free Trial has ended. Email delivery will fall back to simulation/db recording.
if (process.env.MJ_APIKEY_PUBLIC && process.env.MJ_APIKEY_PRIVATE) {
  try {
    mailjet = Mailjet.apiConnect(
      process.env.MJ_APIKEY_PUBLIC,
      process.env.MJ_APIKEY_PRIVATE
    );
    console.log("✅ Mailjet initialized");
  } catch (err) {
    console.warn("⚠️ Mailjet initialization failed:", err.message);
  }
} else {
  console.log("ℹ️ Mailjet is in demo mode (Trial ended). Inquiries will be safely stored in MongoDB.");
}

module.exports = mailjet;