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

const HealthCheckEntry = ({ setModalOpen, patientId }: propTypes) => {
  const type = "HealthCheck";
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [codes, setCodes] = useState<string[]>([]);
  const [rating, setRating] = useState<number>(0);

  const addEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      await patientService.addEntry(patientId, {
        type,
        date,
        description,
        specialist,
        diagnosisCodes: codes,
        healthCheckRating: rating,
      });
       setDate("");
       setDescription("");
       setSpecialist("");
       setCodes([]);
       setRating(0);
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
            label="Health Check Rating"
            type="number"
            value={rating ?? ""}
            onChange={(e) => setRating(Number(e.target.value))}
            inputProps={{ min: 0, max: 3 }}
            fullWidth
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

export default HealthCheckEntry;
