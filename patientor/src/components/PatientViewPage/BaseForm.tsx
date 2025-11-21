import { TextField } from "@mui/material";

interface PropTypes {
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;

  specialist: string;
  setSpecialist: React.Dispatch<React.SetStateAction<string>>;

  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;

  codes: string[];
  setCodes: React.Dispatch<React.SetStateAction<string[]>>;
}

const BaseForm = ({
  date,
  setDate,
  specialist,
  setSpecialist,
  description,
  setDescription,
  codes,
  setCodes,
}: PropTypes) => (
  <>
    <TextField
      label="Date"
      type="date"
      required
      value={date}
      onChange={(e) => setDate(e.target.value)}
      InputLabelProps={{
        shrink: true,
      }}
    />
    <TextField
      label="Description"
      value={description}
      required
      onChange={(e) => setDescription(e.target.value)}
      fullWidth
      multiline
    />
    <TextField
      label="Specialist"
      value={specialist}
      required
      onChange={(e) => setSpecialist(e.target.value)}
      fullWidth
      multiline
    />

    <TextField
      label="Diagnosis Codes"
      multiline
      value={codes.join("\n")}
      onChange={(e) => {
        const arr = e.target.value
          .split("\n")
          .map((c) => c.trim())
          .filter(Boolean);
        setCodes(arr);
      }}
      fullWidth
    />

  </>
);

export default BaseForm;
