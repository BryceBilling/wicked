import { useState } from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  Checkbox,
  FormGroup,
  FormControlLabel,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";

const CRIME_TYPES = ["Type 1", "Type 2", "Type 3"]; // Replace with actual options for crime types
const PROVINCES = ["Province 1", "Province 2", "Province 3"]; // Replace with actual options for provinces

export default function CrimeInput() {
  const [formData, setFormData] = useState({
    thfReference: "",
    crimeTypes: [],
    dateOfOccurrence: "",
    crNumber: "",
    drNumber: "",
    rrbNumber: "",
    station: "",
    province: "",
    anecdotal: "",
    offence: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      crimeTypes: checked
        ? [...prevData.crimeTypes, name]
        : prevData.crimeTypes.filter((type) => type !== name),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: handle form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="THF Reference"
        name="thfReference"
        value={formData.thfReference}
        onChange={handleInputChange}
        sx={{ m: 1 }}
      />

      <FormControl sx={{ m: 1 }}>
        <InputLabel id="crime-types-label">Crime Type</InputLabel>
        <Select
          labelId="crime-types-label"
          multiple
          value={formData.crimeTypes}
          onChange={handleCheckboxChange}
        >
          {CRIME_TYPES.map((type) => (
            <MenuItem key={type} value={type}>
              <Checkbox checked={formData.crimeTypes.includes(type)} />
              {type}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Select one or more crime types</FormHelperText>
      </FormControl>

      <TextField
        label="Date of Occurrence"
        type="date"
        name="dateOfOccurrence"
        value={formData.dateOfOccurrence}
        onChange={handleInputChange}
        sx={{ m: 1 }}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        label="CR Number"
        name="crNumber"
        value={formData.crNumber}
        onChange={handleInputChange}
        sx={{ m: 1 }}
      />

      <TextField
        label="DR Number"
        name="drNumber"
        value={formData.drNumber}
        onChange={handleInputChange}
        sx={{ m: 1 }}
      />

      <TextField
        label="RRB Number"
        name="rrbNumber"
        value={formData.rrbNumber}
        onChange={handleInputChange}
        sx={{ m: 1 }}
      />

      <TextField
        label="Station"
        name="station"
        value={formData.station}
        onChange={handleInputChange}
        sx={{ m: 1 }}
      />

      <FormControl sx={{ m: 1 }}>
        <InputLabel id="province-label">Province</InputLabel>
        <Select
          labelId="province-label"
          value={formData.province}
          onChange={handleInputChange}
          name="province"
        >
          {PROVINCES.map((province) => (
            <MenuItem key={province} value={province}>
              {province}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Anecdotal"
        name="anecdotal"
        value={formData.anecdotal}
        onChange={handleInputChange}
        multiline
        rows={4}
        sx={{ m: 1, width: "100%" }}
      />

      <TextField
        label="Offence"
        name="offence"
        value={formData.offence}
        onChange={handleInputChange}
        multiline
        rows={4}
        sx={{ m: 1, width: "100%" }}
      />

      <Button type="submit" variant="contained" sx={{ m: 1 }}>
        Submit
      </Button>
    </form>
  );
}
