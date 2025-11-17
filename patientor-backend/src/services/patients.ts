import patients from "../data/patients.js";
import { type PatientType, type NewPatientEntry, Gender} from "../types.js";

const getPatients = (): Omit<PatientType, "ssn">[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender: gender as Gender,
      occupation,
    };
  });
};

const addPatient = (entry: NewPatientEntry): PatientType => {
  const newPatient = { ...entry, id: crypto.randomUUID() };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient,
};
