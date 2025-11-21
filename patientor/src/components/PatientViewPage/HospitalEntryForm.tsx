import { useState } from "react";
import patientService from "../../services/patients";
import { FormControl, TextField, Button } from "@mui/material";
import { propTypes } from "../../types";
import BaseForm from "./BaseForm";

const buttonStyle = {
  display: "flex",
  justifyContent: "space-between",
  margin: "0 10px",
};

const HospitalEntryForm = ({ setModalOpen, patientId }: propTypes) => {
  const type = "Hospital";
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [codes, setCodes] = useState<string[]>([]);
  const [dischargeDate, setDischargeDate] = useState("");
  const [criteria, setCriteria] = useState("");

  const addEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      await patientService.addEntry(patientId, {
        type,
        date,
        description,
        specialist,
        diagnosisCodes: codes,
        discharge: {
          date: dischargeDate,
          criteria,
        },
      });
      setDate("");
      setDescription("");
      setSpecialist("");
      setCodes([]);
      setDischargeDate("");
      setCriteria("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <form onSubmit={addEntry}>
        <FormControl
          margin="normal"
          fullWidth
        >
          <BaseForm
            date={date}
            setDate={setDate}
            specialist={specialist}
            setSpecialist={setSpecialist}
            description={description}
            setDescription={setDescription}
            codes={codes}
            setCodes={setCodes}
          />
          <TextField
            label="Discharge Date"
            type="date"
            value={dischargeDate}
            onChange={(e) => setDischargeDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Criteria"
            value={criteria}
            onChange={(e) => setCriteria(e.target.value)}
            fullWidth
            multiline
          />
          <div style={buttonStyle}>
            <Button variant="contained" color="primary" type="submit">
              Add
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </FormControl>
      </form>
    </>
  );
};

export default HospitalEntryForm;
