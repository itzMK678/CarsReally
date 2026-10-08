const express = require("express");
const router = express.Router();
const stripe = require("../config/Stripe.js");

// Fixed plans to avoid client price manipulation vulnerability
const SERVICE_PLANS = {
  vip: { name: "VIP Subscription", amount: 1000 }, // $10.00 in cents
  standard: { name: "Standard Entry", amount: 2500 }, // $25.00
};

router.post(["/create-payment-intent", "/"], async (req, res) => {
  const { serviceType, planId } = req.body;

  // If Stripe is not active (free trial ended), provide clean demo response
  if (!stripe) {
    return res.status(200).json({
      success: true,
      demo: true,
      clientSecret: "demo_client_secret_trial_ended",
      message: "Payment system is in preview mode (Stripe trial ended).",
    });
  }

  try {
    // Determine authoritative amount from server plan map
    const selectedPlan = SERVICE_PLANS[planId] || {
      name: serviceType || "VIP Subscription",
      amount: 1000,
    };

    const paymentIntent = await stripe.paymentIntents.create({
      amount: selectedPlan.amount,
      currency: "usd",
      metadata: {
        serviceType: selectedPlan.name,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("❌ Stripe Error:", error.message);
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to create payment intent",
    });
  }
});

module.exports = router;