import express from "express";
import { fetchSummary,addConEntry,addEqEntry,fetchTable, deleteAll } from "../controllers/budgetController.js";

const router = express.Router();

  router.post(
    "/addconsumableentry",
  
    addConEntry
  );
  // router.post(
  //   "/addequipmentdept",
  
  //   addequipmentdept
  // );
  router.post(
    "/addequipmententry",
  
    addEqEntry
  );
  
  router.get(
    "/fetchtable",
  
    fetchTable
  );

  router.get(
    "/fetchsummary",
    fetchSummary
  )
  router.post(
    "/deleteAll",
    deleteAll
  )

export default router;
