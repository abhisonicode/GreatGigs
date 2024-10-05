import express from "express";
import { verifyToken } from "../middlewares/jwt.js";
import {
  getOrders,
  intent,
  confirm,
  markAsFinished,
} from "../controllers/order.controller.js";

const orderRouter = express.Router();

// orderRouter.post("/:gigId", verifyToken, createOrder);
orderRouter.get("/getorders", verifyToken, getOrders);
orderRouter.post("/create-payment-intent/:id", verifyToken, intent);
orderRouter.put("/confirmorder", verifyToken, confirm);
orderRouter.put("/markasfinished/:id", verifyToken, markAsFinished);

export default orderRouter;
