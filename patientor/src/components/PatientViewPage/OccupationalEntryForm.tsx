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

const OccupationalEntryForm = ({ setModalOpen, patientId }: propTypes) => {
  const type = "OccupationalHealthcare";
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [codes, setCodes] = useState<string[]>([]);
  const [employer, setEmployer] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const addEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      await patientService.addEntry(patientId, {
        type,
        date,
        description,
        specialist,
        diagnosisCodes: codes,
        employerName: employer,
        sickLeave: {
          startDate,
          endDate,
        },
      });
      setDate("");
      setDescription("");
      setSpecialist("");
      setCodes([]);
      setEmployer("");
      setStartDate("");
      setEndDate("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <form onSubmit={addEntry}>
        <FormControl margin="normal" fullWidth>
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
            label="Employer"
            value={employer}
            required
            onChange={(e) => setEmployer(e.target.value)}
            fullWidth
            multiline
          />
          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            required
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="End Date"
            type="date"
            value={endDate}
            required
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
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

export default OccupationalEntryForm;
