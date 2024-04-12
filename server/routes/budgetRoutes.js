import express from "express";
import {
  fetchSummary,
  updateEntry,
  fetchTable,
  deleteAll,
  fetchBudget,
} from "../controllers/budgetController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/updateentry", authMiddleware, updateEntry);

router.get("/fetchtable", authMiddleware, fetchTable);

router.get("/fetchbudget", authMiddleware, fetchBudget);

router.get("/fetchsummary", authMiddleware, fetchSummary);
router.post("/deleteAll", authMiddleware, deleteAll);

export default router;
