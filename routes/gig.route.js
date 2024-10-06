import express from "express";
import { verifyToken } from "../middlewares/jwt.js";
import {
  createGig,
  deleteGigGig,
  getAllGigs,
  getGig,
} from "../controllers/gig.controller.js";
const gigRouter = express.Router();

// Routes
gigRouter.post("/createGig", verifyToken, createGig);
gigRouter.delete("/deleteGig/:id", verifyToken, deleteGigGig);
gigRouter.get("/getGig/:id", getGig);
gigRouter.get("/getGigs", getAllGigs);

export default gigRouter;
