const dotenv = require("dotenv");

// Load correct env file
const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

dotenv.config({ path: envFile });

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./database/config/db");

//! To run the backend for DEVELOPMENT -> npm run dev
//! To run the backend for PRODUCTION -> npm start

// DB Connection
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/poems", require("./routes/poemRoutes"));
app.use("/api/email", require("./routes/emailRoutes"));
app.use("/api/subscribe", require("./routes/subscribeRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Health check
app.get("/", (req, res) => {
  res.send("🚀 API is running & LIVE...");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🔥 Server running on port ${PORT} (${process.env.NODE_ENV})`),
);
