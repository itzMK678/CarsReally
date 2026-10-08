// server/config/Stripe.js
const Stripe = require("stripe");

let stripe = null;

// Stripe Free Trial has ended. Stripe calls will be simulated/handled gracefully.
if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY.startsWith("sk_")) {
  try {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    console.log("✅ Stripe initialized");
  } catch (err) {
    console.warn("⚠️ Stripe initialization failed:", err.message);
  }
} else {
  console.log("ℹ️ Stripe is in demo mode (Stripe trial ended / keys disabled).");
}

module.exports = stripe;