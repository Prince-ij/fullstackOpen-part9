import express from "express";
import patientService from "../services/patients.js";
import type { Request, Response, NextFunction } from "express";

import z  from "zod";
import {
  NewPatientEntrySchema,
  type NewPatientEntry,
  type PatientType,
} from "../types.js";

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.get("/", (_req, res) => {
  res.json(patientService.getPatients());
});

router.post(
  "/",
  newPatientParser,
  (
    req: Request<unknown, unknown, NewPatientEntry>,
    res: Response<PatientType>
  ) => {
    const newPatient = patientService.addPatient(req.body);
    res.json(newPatient);
  }
);

export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.use(errorMiddleware);

export default router;
