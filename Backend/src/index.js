import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import { app, server } from './lib/socket.js';

dotenv.config();

const PORT = process.env.PORT;

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173", // your frontend
  credentials: true
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoute);

// Start server
server.listen(PORT, () => {
  console.log(`✅ Server is running on Port: ${PORT}`);
  connectDB();
});
