import express from "express";
import patientService from "../services/patients.js";
import type { Request, Response, NextFunction } from "express";

import z from "zod";
import {
  NewPatientEntrySchema,
  type NewPatientEntry,
  type NonSensitivePatient,
  NewEntrySchema,
  type EntryWithoutId
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

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.get("/", (_req, res) => {
  res.json(patientService.getPatients());
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  res.json(patientService.getPatient(id));
});

router.post(
  "/",
  newPatientParser,
  (
    req: Request<unknown, unknown, NewPatientEntry>,
    res: Response<NonSensitivePatient>
  ) => {
    const newPatient = patientService.addPatient(req.body);
    res.json(newPatient);
  }
);

router.post(
  "/:id/entries",
  newEntryParser,
  (
    req: Request<{id: string}, unknown, EntryWithoutId>,
    res: Response<NonSensitivePatient>
  ) => {
    const id = req.params.id;
    const newEntry = patientService.addEntry(id, req.body);
    res.json(newEntry);
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
