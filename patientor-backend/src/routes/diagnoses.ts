import express from "express";
import  diagnosesService from "../services/diagnoses.js";
const router = express.Router();

router.get("/", (_req, res) => {
  return res.json(diagnosesService.getDiagnoses());
});

export default router;
