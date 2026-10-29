import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

import { connectDB } from './src/lib/db.js';
import authRoutes from './src/routes/auth.route.js';
import messageRoutes from './src/routes/message.route.js';
import {app , server } from './src/lib/socket.js';



dotenv.config();
const port = process.env.PORT;
const __dirname = path.resolve();
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/chatApp/dist")));
  app.get("*", (req , res) => {
    res.sendFile(path.join(__dirname, "../frontend/chatApp/dist/index.html"));
  })
}

app.use((err, req, res, next) => {
  if (err.type === "entity.too.large") {
    return res.status(413).json({
      message: "Request payload is too large. Please choose a smaller image.",
    });
  }
  next(err);
});

server.listen(port , () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
})