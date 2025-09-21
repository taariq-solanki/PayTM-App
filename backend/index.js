const express = require("express");
const cors = require("cors");
require('dotenv').config();

const mainRouter = require("./routes");          // routes/index.js
const userRouter = require("./routes/user");     // routes/user.js
const { accountRouter } = require("./routes/account"); // routes/account.js

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Test API route
app.get("/api/v1/test", (req, res) => {
  res.json({ message: "API is working!" });
});

// Register routers
app.use("/api/v1", mainRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/account", accountRouter);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});
