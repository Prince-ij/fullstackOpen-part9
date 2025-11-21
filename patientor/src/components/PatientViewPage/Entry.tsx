import { type Entry } from "../../types";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const divStyle = {
    border: "1px solid black",
    padding: "5px",
    borderRadius: "10px",
    margin: "10px 0px"
};

const Entry = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return (
        <div style={divStyle}>
          <p>
            {entry.date} <MedicationLiquidIcon />
          </p>
          <p>{entry.description}</p>
          <p>Rating: {entry.healthCheckRating}</p>
          <p>diagnosed by: {entry.specialist}</p>
        </div>
      );
    case "Hospital":
      return (
        <div style={divStyle}>
          <p>{entry.date} <LocalHospitalIcon /></p>
          <p>{entry.description}</p>
          <p>diagnosed by: {entry.specialist}</p>
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div style={divStyle}>
          <p>
            {entry.date} <WorkHistoryIcon />
          </p>
          <p>{entry.description}</p>
          <p>{entry.employerName}</p>
          <p>diagnosed by: {entry.specialist}</p>
        </div>
      );
    default:
      return assertNever(entry);
  }
};

export default Entry;
