import express from "express";
import {
  createMessage,
  getMessages,
} from "../controllers/message.controller.js";
import { verifyToken } from "../middlewares/jwt.js";

const messageRouter = express.Router();

messageRouter.post("/", verifyToken, createMessage);
messageRouter.get("/:id", verifyToken, getMessages);

export default messageRouter;
