const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Admin = require("../models/AdminSchema.js");
const { verifyToken } = require("../middlewares/auth.middleware.js");

// Seed default admin if none exists
const ensureDefaultAdmin = async () => {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const defaultAdmin = new Admin({
        name: "CarsReally Admin",
        email: "admin@carsreally.com",
        password: "admin123", // Will be hashed by AdminSchema pre-save hook
        role: "admin",
      });
      await defaultAdmin.save();
      console.log("ℹ️ Default admin initialized: admin@carsreally.com");
    }
  } catch (err) {
    // If DB is not connected yet, ignore silently
  }
};

// POST /api/auth/login (or /login)
router.post("/login", async (req, res) => {
  try {
    await ensureDefaultAdmin();

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Please provide both email and password",
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const admin = await Admin.findOne({ email: cleanEmail });

    if (!admin) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }

    const passwordMatches = await admin.comparePassword(password);
    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }

    const secret = process.env.JWT_SECRET || "carsreally_fallback_jwt_secret_key";
    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
      secret,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    return res.status(500).json({
      success: false,
      error: "Server error during login",
    });
  }
});

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "Name, email, and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: "Password must be at least 6 characters",
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const existing = await Admin.findOne({ email: cleanEmail });
    if (existing) {
      return res.status(409).json({
        success: false,
        error: "An account with this email already exists",
      });
    }

    const newAdmin = new Admin({
      name: name.trim(),
      email: cleanEmail,
      password,
      role: "admin",
    });

    await newAdmin.save();

    return res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      admin: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
      },
    });
  } catch (error) {
    console.error("❌ Register error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to register admin",
    });
  }
});

// GET /api/auth/me (Verify active token)
router.get("/me", verifyToken, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select("-password");
    if (!admin) {
      return res.status(404).json({ success: false, error: "Admin not found" });
    }
    return res.json({ success: true, admin });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/auth/change-password
router.post("/change-password", verifyToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        error: "Both current and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        error: "New password must be at least 6 characters",
      });
    }

    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(404).json({ success: false, error: "Admin not found" });
    }

    const matches = await admin.comparePassword(currentPassword);
    if (!matches) {
      return res.status(400).json({
        success: false,
        error: "Current password does not match",
      });
    }

    admin.password = newPassword;
    await admin.save();

    return res.json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;