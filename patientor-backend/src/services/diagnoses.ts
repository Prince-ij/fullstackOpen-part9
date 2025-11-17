import diagnoses from "../data/diagnoses.js";
import type { DiagnosesEntry } from "../types.js";

const getDiagnoses = (): DiagnosesEntry[] => {
  return diagnoses;
};

export default {
  getDiagnoses,
};
