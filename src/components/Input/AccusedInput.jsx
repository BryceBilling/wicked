import { useState } from "react";
import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Button,
} from "@mui/material";

const NATIONALITIES = ["USA", "Canada", "Australia", "India"]; // Replace with actual options for nationalities

function CrimeForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    nationality: "",
    gender: "",
    idNumber: "",
    passportNumber: "",
    dateOfBirth: "",
    phoneNumber: "",
    businessAddress: "",
    residentialAddress: "",
    chief: "",
    chiefVillage: "",
    extraInformation: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNationalityChange = (event, value) => {
    setFormData((prevData) => ({ ...prevData, nationality: value }));
  };

  const handleGenderChange = (event) => {
    setFormData((prevData) => ({ ...prevData, gender: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: handle form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleInputChange}
        sx={{ m: 1 }}
      />

      <TextField
        label="Surname"
        name="surname"
        value={formData.surname}
        onChange={handleInputChange}
        sx={{ m: 1 }}
      />

      <Autocomplete
        options={NATIONALITIES}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Nationality"
            name="nationality"
            value={formData.nationality}
            onChange={handleNationalityChange}
            sx={{ m: 1 }}
          />
        )}
      />

      <FormControl component="fieldset" sx={{ m: 1 }}>
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          row
          name="gender"
          value={formData.gender}
          onChange={handleGenderChange}
        >
          <FormControlLabel
            value="male"
            control={<Radio />}
            label="Male"
            sx={{ mr: 2 }}
          />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>
      </FormControl>

      <TextField
        label="ID Number"
        name="idNumber"
        value={formData.idNumber}
        onChange={handleInputChange}
        sx={{ m: 1 }}
      />

      <TextField
        label="Passport Number"
        name="passportNumber"
        value={formData.passportNumber}
        onChange={handleInputChange}
        sx={{ m: 1 }}
      />

      <TextField
        label="Date of Birth"
        name="dateOfBirth"
        value={formData.dateOfBirth}
        onChange={handleInputChange}
        type="date"
        sx={{ m: 1 }}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        label="Phone Number"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleInputChange}
        sx={{ m: 1 }}
      />
      <TextField
        label="Business Address"
        value={formData.businessAddress}
        onChange={handleInputChange}
        fullWidth
      />
      <TextField
        label="Residential Address"
        value={formData.residentialAddress}
        onChange={handleInputChange}
        fullWidth
      />
      <TextField
        label="Chief"
        value={formData.chief}
        onChange={handleInputChange}
        fullWidth
      />
      <TextField
        label="Chief Village"
        value={formData.chiefVillage}
        onChange={handleInputChange}
        fullWidth
      />
      <TextareaAutosize
        label="Extra Information"
        value={formData.extraInfo}
        onChange={handleInputChange}
        placeholder="Enter extra information"
        minRows={3}
        maxRows={6}
        fullWidth
      />
      <Button type="submit" variant="contained" sx={{ m: 1 }}>
        Submit
      </Button>
    </form>
  );
}
