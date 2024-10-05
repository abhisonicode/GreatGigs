import express from "express";
import {
  deleteUser,
  getUserByEmail,
  getUserById,
  getUserByUserName,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/jwt.js";
const userRouter = express.Router();

// Routes
userRouter.delete("/delete/:id", verifyToken, deleteUser);
userRouter.get("/getuserbyusername/:username", getUserByUserName);
userRouter.get("/getuserbyemail", getUserByEmail);
userRouter.get("/getuserbyid/:id", getUserById);

export default userRouter;
