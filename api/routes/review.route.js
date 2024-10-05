import express from "express";
import { verifyToken } from "../middlewares/jwt.js";
import {
  createReview,
  getReviews,
  deleteReview,
} from "../controllers/review.controller.js";

const reviewRouter = express.Router();

reviewRouter.post("/", verifyToken, createReview);
reviewRouter.get("/:gigId", getReviews);
reviewRouter.delete("/:id", verifyToken, deleteReview);

export default reviewRouter;
