import { useState } from "react";
import { propTypes } from "../../types";
import {
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import HospitalEntryForm from "./HospitalEntryForm";
import HealthCheckEntry from "./HealthCheckEntry";
import OccupationalEntryForm from "./OccupationalEntryForm";


const AddEntry = ({ setModalOpen, patientId }: propTypes) => {
  const [entryType, setEntryType] = useState("Health Check");

  const handleTypeChange = (type: string) => {
    setEntryType(type);
  };

  const divStyle = {
    padding: "5px",
    border: "2px dotted black",
    margin: "5px",
    borderRadius: "5px",
  };

  const renderForm = () => {
    switch (entryType) {
      case "Health Check":
        return (
          <HealthCheckEntry setModalOpen={setModalOpen} patientId={patientId} />
        );
      case "Occupational Health Care":
        return (
          <OccupationalEntryForm
            setModalOpen={setModalOpen}
            patientId={patientId}
          />
        );
      case "Hospital":
        return (
          <HospitalEntryForm
            setModalOpen={setModalOpen}
            patientId={patientId}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div style={divStyle}>
      <h3>New {entryType} entry</h3>
      <FormControl margin="normal">
        <Select
          value={entryType}
          onChange={({ target }) => handleTypeChange(target.value)}
        >
          <MenuItem value={"Health Check"}>Health Check</MenuItem>
          <MenuItem value={"Occupational Health Care"}>
            Occupational Health Care
          </MenuItem>
          <MenuItem value={"Hospital"}>Hospital</MenuItem>
        </Select>
      </FormControl>

      {renderForm()}
    </div>
  );
};

export default AddEntry;
