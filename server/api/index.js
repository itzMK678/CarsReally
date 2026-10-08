// server/api/index.js
require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});

const express = require("express");
const cors = require("cors");
const http = require("http");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");

// DB Connection
const connectToDb = require("../config/DB.js");

// Route Handlers
const authRoutes = require("../routes/authentication.route.js");
const eventRoutes = require("../routes/event.routes.js");
const mailRoutes = require("../routes/mail.routes.js");
const paymentRoutes = require("../routes/payment.routes.js");

// Setup App & Server
const app = express();
const server = http.createServer(app);

// -------------------------------------------------------------
// CORS Configuration
// -------------------------------------------------------------
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((s) => s.trim())
  : ["http://localhost:5173", "http://localhost:3000"];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests (Postman, curl, server-to-server) or matched origins
    if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} is not allowed by CORS`));
    }
  },
  credentials: true,
};

// -------------------------------------------------------------
// Global Middlewares (Mounted BEFORE routes)
// -------------------------------------------------------------
app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan("dev"));
app.use(cors(corsOptions));
// Increased JSON limit (10MB) to prevent 413 Payload Too Large on image uploads
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// -------------------------------------------------------------
// Database Connection
// -------------------------------------------------------------
connectToDb();

// -------------------------------------------------------------
// Realtime (Socket.IO)
// Currently commented out as requested. Uncomment when deploying
// to a persistent server (Render/Railway/VPS):
// -------------------------------------------------------------
/*
const { initializeSocket } = require("../config/socket.js");
initializeSocket(server, allowedOrigins);
*/

// -------------------------------------------------------------
// API Routes & Backward-Compatible Aliases
// -------------------------------------------------------------
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/mail", mailRoutes);
app.use("/api/payment", paymentRoutes);

// Root aliases so existing frontend fetch calls (e.g., /trueEvents, /getEvent, /sendMail) keep working:
app.use("/", eventRoutes);
app.use("/", mailRoutes);
app.use("/", paymentRoutes);

// Health Check with DB verification
app.get("/", (req, res) => {
  const isDbConnected = mongoose.connection.readyState === 1;
  res.json({
    status: "ok",
    database: isDbConnected ? "connected" : "disconnected",
    message: "CarsReally API server is running smoothly",
    timestamp: new Date().toISOString(),
  });
});

// -------------------------------------------------------------
// Centralized Error Handling Middleware
// -------------------------------------------------------------
app.use((err, req, res, next) => {
  console.error("❌ Unhandled Error:", err.message);
  const status = err.statusCode || err.status || 500;
  res.status(status).json({
    success: false,
    error: err.message || "Internal Server Error",
  });
});

// -------------------------------------------------------------
// Server Activation
// -------------------------------------------------------------
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "test") {
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ CarsReally Server running on port ${PORT}`);
  });
}

module.exports = app;
