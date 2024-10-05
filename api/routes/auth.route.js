import express from "express";
import { Login, Logout, Register } from "../controllers/auth.controller.js";

const authRouter = express.Router();

// Routes
authRouter.post("/register", Register);
authRouter.post("/login", Login);
authRouter.post("/logout", Logout);

export default authRouter;
