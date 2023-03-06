import { Autocomplete, TextField, Chip } from "@mui/material";
import { useState } from "react";

const zimbabweProvinces = [
  { label: "Bulawayo" },
  { label: "Harare" },
  { label: "Manicaland" },
  { label: "Mashonaland Central" },
  { label: "Mashonaland East" },
  { label: "Mashonaland West" },
  { label: "Masvingo" },
  { label: "Matabeleland North" },
  { label: "Matabeleland South" },
  { label: "Midlands" },
];

const ZimbabweProvinceAutocomplete = ({ onSelect }) => {
  const [selectedProvinces, setSelectedProvinces] = useState([]);

  const handleProvinceChange = (event, newValue) => {
    if (newValue) {
      const newProvince = newValue[newValue.length - 1];
      const isAlreadySelected = selectedProvinces.some(
        (province) => province.label === newProvince.label
      );
      if (!isAlreadySelected) {
        setSelectedProvinces([...selectedProvinces, newProvince]);
        onSelect([...selectedProvinces, newProvince]);
      }
    }
  };

  const handleRemoveProvince = (provinceToRemove) => () => {
    setSelectedProvinces((prevSelectedProvinces) =>
      prevSelectedProvinces.filter(
        (province) => province.label !== provinceToRemove.label
      )
    );
    onSelect(
      selectedProvinces.filter(
        (province) => province.label !== provinceToRemove.label
      )
    );
  };

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      clearOnBlur={false}
      options={zimbabweProvinces}
      getOptionLabel={(option) => option.label}
      value={selectedProvinces}
      onChange={(event, newValue) => {
        setSelectedProvinces(newValue);
        onSelect(newValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Select province(s)" variant="outlined" />
      )}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            key={option.label}
            label={option.label}
            {...getTagProps({ index })}
            onDelete={handleRemoveProvince(option)}
          />
        ))
      }
    />
  );
};

export default ZimbabweProvinceAutocomplete;
