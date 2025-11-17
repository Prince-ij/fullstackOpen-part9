import z from "zod";

export interface DiagnosesEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientType {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type NewPatientEntry = Omit<PatientType, "id">;

export enum Gender {
  male = "male",
  female = "female",
}

export const NewPatientEntrySchema = z.object({
  name: z.string(),
  ssn: z.string(),
  occupation: z.string(),
  dateOfBirth: z.iso.date(),
  gender: z.enum(Gender),
});
