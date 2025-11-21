import patients from "../data/patients.js";
import {
  type NonSensitivePatient,
  type NewPatientEntry,
  type PatientType,
  type EntryWithoutId,
} from "../types.js";

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => {
      return {
        id,
        name,
        dateOfBirth,
        gender: gender,
        occupation,
        entries,
      };
    }
  );
};

const addPatient = (entry: NewPatientEntry): NonSensitivePatient => {
  const newPatient = { ...entry, id: crypto.randomUUID(), entries: [] };
  patients.push(newPatient);
  return newPatient;
};

const getPatient = (id: string): PatientType | undefined => {
  const results = patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries, ssn }) => {
      return {
        id,
        name,
        dateOfBirth,
        gender: gender,
        occupation,
        entries,
        ssn,
      };
    }
  );
  const patient = results.find((p) => p.id === id);
  return patient;
};

const addEntry = (id: string, entry: EntryWithoutId): PatientType | undefined => {
  const patient = patients.find((p) => p.id === id);
  patient?.entries.push({id: crypto.randomUUID(), ...entry});
  return patient;
};

export default {
  getPatients,
  addPatient,
  getPatient,
  addEntry,
};
