import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import reviewRouter from "./routes/review.route.js";
import conversationRouter from "./routes/conversation.route.js";
import gigRouter from "./routes/gig.route.js";
import messageRouter from "./routes/message.route.js";
import orderRouter from "./routes/order.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express(); // Initialialized Express.js
dotenv.config(); // For accessing .env files

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_DB);
    console.log("connected");
  } catch (error) {
    console.log("connection failed");
  }
};

// Allow requests from your React app's origin
const corsOptions = {
  origin: "https://greatgigs.onrender.com",
  credentials: true, // If you need to include credentials like cookies
};
app.use(cors(corsOptions));
app.use(express.json()); // for accepting JSON request while API calls
app.use(cookieParser()); // for parsing cookies

// Setup Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/review", reviewRouter);
app.use("/api/conversation", conversationRouter);
app.use("/api/gig", gigRouter);
app.use("/api/message", messageRouter);
app.use("/api/order", orderRouter);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "!";
  return res.status(errorStatus).send(errorMessage);
});

const port = process.env.PORT || 8800;

app.listen(port, () => {
  connectDB();
});
