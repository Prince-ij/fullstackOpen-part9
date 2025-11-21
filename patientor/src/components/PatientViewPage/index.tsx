import { Patient } from "../../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import { Button } from "@mui/material";
import patientService from "../../services/patients";
// import diagnosisService from "../../services/diagnoses";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Entry from "./Entry";
import AddEntry from "./AddEntry";

const PatientView = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  // const [diagnosis, setDiagnosis] = useState<Diagnosis[] | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      const response = await patientService.getPatient(id as string);
      setPatient(response);
    };

    // const fetchDiagnosis = async () => {
    //   const response = await diagnosisService.getAll();
    //   setDiagnosis(response);
    // };
    fetchPatient();
    // fetchDiagnosis();
  });

  return (
    <>
      <h1>
        {patient?.name}
        {patient?.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
      </h1>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>

      {!modalOpen && (
        <Button variant="contained" onClick={() => setModalOpen(true)}>
          Add Entry
        </Button>
      )}
      {modalOpen && patient && (
        <AddEntry setModalOpen={setModalOpen} patientId={patient.id} />
      )}

      <h3>Entries</h3>
      {patient?.entries.map((entry) => (
        <Entry key={entry.id} entry={entry} />
      ))}
    </>
  );
};

export default PatientView;
