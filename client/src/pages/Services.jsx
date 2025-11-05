// src/pages/Services.jsx
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Quality from "../components/Quality";
import Service from "../assets/Services.jpg";
import Stats from "../components/home/Stats";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// 🔹 Load Stripe with your publishable key
const stripePromise = loadStripe("pk_test_51S8nLHPB7TNnctoCQNbYRPuTlIJlyCPGlenrKGAET6fKEQ3Sbo1LgCTvuoPmxbFItOEWGfwh6pnlsUbgJWxyEIEM00OcRGubey"); // replace with your publishable key

// ✅ Checkout Form
function CheckoutForm({ amount }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    try {
      // 🔹 Step 1: Ask backend for PaymentIntent
      const res = await fetch("http://localhost:5000/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }), // amount in cents
      });

      const { clientSecret, error } = await res.json();
      if (error) {
        setMessage(error);
        setLoading(false);
        return;
      }

      // 🔹 Step 2: Confirm Payment (card or bank)
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:3000/payment-success", 
        },
      });

      if (result.error) {
        setMessage(result.error.message);
      } else {
        setMessage("✅ Payment initiated! Please check your card/bank.");
      }
    } catch (err) {
      setMessage("❌ Payment request failed");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" flex flex-col gap-4 max-w-fit mx-auto bg-black/40 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/10"
    >
      {/* Price Display */}
      <div className="text-center mb-2" >
        <p className="text-2xl font-bold text-[#00F9FF]">${amount / 100}</p>
        <p className="text-gray-300 text-sm">VIP Subscription</p>
      </div>

      {/* 🔹 Stripe Payment Element */}
      <PaymentElement
        options={{ layout: "tabs" }} // "tabs" shows Card / Bank options
        className="p-3 rounded-md bg-white/10 w-[800px]"
      />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-gradient-to-r from-[#00F9FF] to-blue-500 text-black font-semibold py-3 rounded-md hover:opacity-90 transition"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>

      {/* Error / Success Message */}
      {message && (
        <p className="text-sm text-white text-center mt-2">{message}</p>
      )}
    </form>
  );
}


const Services = () => {
  const options = {
    mode: "payment",
    currency: "usd",
    amount: 1000, // $10 in cents
    appearance: {
      theme: "night", // dark theme
      variables: {
        colorPrimary: "#00F9FF",
        fontFamily: "Arial, sans-serif",
        borderRadius: "8px",
      },
    },
  };
 const withoutPremium = [
    "Register your events easily",
    "Your Event name will be displayed on your event page",
    "We will Guide you organize your event",
    "Your event will be Shown on our website",
  ];

  const withPremium = [
    "Your own poster will be displayed instead of company poster",
    "You will get notifications on event day",
    "VIP tag will be shown on your event",
    "Priority support and visibility",
  ];
  return (
    
    <div className="py-16 bg-gradient-to-r from-black to-blue-950 min-h-screen flex flex-col justify-center items-center">
      <div
        className="relative w-full h-[300px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${Service})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Centered Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4">
          <p className="text-6xl font-bold text-white text-stroke">
            Services
          </p>
          <p className="mt-4 text-xl font-semibold text-white max-w-2xl">
           Service that we provide to make your event memorable
          </p>
        </div>
      </div>

      {/* ✅ Comparison  Section */}
      <div className="w-fit  mx-auto gap-16 my-3 px-6 py-12">
        {/* Without Premium */}
        <div className="my-6 bg-white/10  w-full max-w-[800px]  backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20 relative">
          <h2 className="absolute -top-6 left-30 text-4xl font-bold text-white mb-6 text-center">
            Our Services 
          </h2>
          <div className="space-y-6">
            {withoutPremium.map((point, index) => (
              <div
                key={index}
                data-aos="fade-left"
                className="bg-white/20  font-semibold rounded-[8px] px-4 py-3 text-white text-center hover:bg-white/30 transition"
              >
                {point}
              </div>
            ))}
          </div>
        </div>

        {/* With Premium */}
        <div className="my-6  w-full max-w-[800px] mt-35 bg-cyan-700/20 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-cyan-400 relative">
          <h2 className="absolute -top-6 left-30 text-4xl font-bold text-cyan-300 mb-6 text-center">
           Our Vip Service
          </h2>
          <div className="space-y-4">
            {withPremium.map((point, index) => (
              <div
                key={index}
                data-aos="fade-right"
                className="bg-cyan-600/40 font-semibold rounded-[8px] px-4 py-3 text-purple-100 text-center hover:bg-cyan-600/60 transition"
              >
                {point}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Quality />
      <Stats/>
        <div className="text-center   mb-8">
          <h1 className="text-4xl font-bold text-white">Our Services</h1>
          <p className="mt-3 text-gray-300">
            Choose a VIP subscription and pay securely using Stripe (Card / Bank)
          </p>
        </div>

        {/* Stripe Elements Wrapper */}
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm amount={1000} />
        </Elements>
     
    </div>
  );
};


export default Services;
