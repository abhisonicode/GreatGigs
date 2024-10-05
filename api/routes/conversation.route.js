import express from "express";
import {
  createConversation,
  getConversations,
  getSingleConversation,
  updateConversation,
} from "../controllers/conversation.controller.js";
import { verifyToken } from "../middlewares/jwt.js";

const conversationRouter = express.Router();

conversationRouter.get("/", verifyToken, getConversations);
conversationRouter.post("/", verifyToken, createConversation);
conversationRouter.get("/single/:id", verifyToken, getSingleConversation);
conversationRouter.put("/:id", verifyToken, updateConversation);

export default conversationRouter;
