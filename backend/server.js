const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const rateLimit = require('express-rate-limit');
const reviewRoutes = require("./routes/reviews");

const app = express();

// 1. Tell Express to trust Render's proxy headers so it grabs your phone's real IP
app.set("trust proxy", 1); 

// 2. Clear CORS configuration (Allows your wide-open access across devices)
app.use(cors());
app.use(express.json());

// 3. Define Rate Limiters
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, 
  message: { message: 'Too many requests, please try again later' },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,  // Disable the `X-RateLimit-*` headers
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20, // Slightly bumped for testing multi-device setups
  message: { message: 'Too many login attempts, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});

// 4. Apply Global Limiter to general API endpoints
app.use("/api", limiter);

// 5. Load your Route files
const authRoutes = require("./routes/auth");
const requestRoutes = require("./routes/requests");
const bookingRoutes = require("./routes/bookings");
const adminRoutes = require("./routes/admin");
const aiRoutes = require("./routes/ai");
const verificationRoutes = require("./routes/verification");

// 6. Bind Specific Auth Limiters directly to the target routes cleanly
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);

// 7. Mount the Parent Routes
app.use("/api/auth", authRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/verification", verificationRoutes);
app.use("/api/reviews", reviewRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("AcademIQ API is running...");
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });