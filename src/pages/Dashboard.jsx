import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";

import PropTypes from "prop-types";
import { styled } from "@mui/system";
import ZimbabweProvinceAutocomplete from "../utilities/ZimbabweProvincesAutocomplete";
import ProvincialHeatmap from "../components/Reports/ProvincialHeatmap";
import axios from "axios";
import ProvincialHeatmapTable from "../components/Tables/ProvincialHeatmapTable";
import CrimeFeed from "../components/General/CrimesFeed";
import PieChart from "../components/Reports/PieChart";
import PieChartTable from "../components/Tables/HorizontalPieChartTable";
import HorizontalPieChartTable from "../components/Tables/HorizontalPieChartTable";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const MainContainer = styled(Grid)({
  height: "100vh",
});

const SidebarContainer = styled(Grid)({
  backgroundColor: "#f5f5f5",
  height: "100%",
  padding: "0.5rem",
});

const TabPanelContainer = styled(Box)({
  height: "100%",
});

const countries = [
  { label: "Afghanistan" },
  { label: "Albania" },
  { label: "Algeria" },
  { label: "Andorra" },
  { label: "Angola" },
  // ...and so on for all the countries in the world
];

const data = [
  { label: "Convicted (9+)", value: 15 },
  { label: "Convicted (<9)", value: 25 },
  { label: "Acquitted", value: 2 },
  { label: "Warrant", value: 3 },
  { label: "Bail", value: 5 },
  { label: "Further remand refused", value: 1 },
  { label: "Pending", value: 3 },
  { label: "Dead", value: 0 },
  { label: "Escaped", value: 0 },
  { label: "Remanded", value: 3 },
  { label: "Fine", value: 12 },
  { label: "Community service", value: 3 },
];

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [showCountryOptions, setShowCountryOptions] = useState(false);
  const [showProvinceOptions, setShowProvinceOptions] = useState(false);
  const [selectedRadioOption, setSelectedRadioOption] = useState("all");
  const [selectedCheckOption, setSelectedCheckOption] = useState("");
  const [selectedProvinces, setSelectedProvinces] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [total, setTotal] = useState(0);
  const [crimesProvData, setCrimesProvData] = useState([]);
  const [crimes, setCrimes] = useState([]);
  const [crimesMaxValue, setCrimesMaxValue] = useState(0);
  const [selectedCrime, setSelectedCrime] = useState(null);

  const handleCrimeSelect = (crime) => {
    setSelectedCrime(crime);
  };

  async function getInfo() {
    const result = axios.get("/api/google");
    console.log(result);
  }

  useEffect(() => {
    getInfo();
  }, []);

  const handleRadioChange = (event) => {
    const selectedValue = event.target.value;

    setSelectedRadioOption(selectedValue);
    setSelectedCheckOption("");

    if (selectedValue === "local") {
      setShowProvinceOptions(true);
      setShowCountryOptions(false);
    } else if (selectedValue === "international") {
      setShowProvinceOptions(false);
      setShowCountryOptions(true);
    } else {
      setShowProvinceOptions(false);
      setShowCountryOptions(false);
    }
  };

  async function getAllInfo() {
    const totalCrimes = await axios.get("/api/all-crimes-count");
    const maxValue = await axios.get("/api/provincial-max-value");
    const allCrimes = await axios.get("/api/all-crimes");
    const provCrimes = await axios.get("/api/provincial-summary");
    setTotal(totalCrimes.data[0].total);
    setCrimesMaxValue(maxValue.data[0].max_count);
    setCrimes(allCrimes.data);
    setCrimesProvData(provCrimes.data);
  }

  useEffect(() => {
    getAllInfo();
  }, [selectedTab]);

  const handleCheckboxChange = (event) => {
    var selectedValue = event.target.value;
    if (selectedCheckOption === selectedValue) {
      selectedValue = "";
    }
    setSelectedCheckOption(selectedValue);

    if (selectedValue === "province") {
      setShowProvinceOptions(true);
      setShowCountryOptions(false);
    } else if (selectedValue === "country") {
      setShowProvinceOptions(false);
      setShowCountryOptions(true);
    } else {
      setShowProvinceOptions(selectedRadioOption === "local");
      setShowCountryOptions(selectedRadioOption === "international");
    }
  };
  const handleProvincesChange = (event, newValue) => {
    setSelectedProvinces(newValue);
    console.log("Selected provinces:", newValue);
  };

  const handleCountrySelect = (event, country) => {
    setSelectedCountry(country);
    console.log("Selected country:", country);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <MainContainer container>
      <SidebarContainer item xs={2}>
        <h3>Filters</h3>
        <Typography component="span" variant="caption" color="text.secondary">
          Use the following to filter the dashboard elements to a specific crime
          type or time period
        </Typography>
        <br />
        <br />
        <FormControl component="fieldset">
          <FormLabel component="legend">Options</FormLabel>
          <RadioGroup
            aria-label="options"
            name="options"
            value={selectedRadioOption}
            onChange={handleRadioChange}
            row
            sx={{ marginBottom: 1 }}
          >
            <FormControlLabel
              value="all"
              control={<Radio size="small" />}
              label="All"
              labelPlacement="end"
            />
            <FormControlLabel
              value="local"
              control={<Radio size="small" />}
              label="Local"
              labelPlacement="end"
            />
            <FormControlLabel
              value="international"
              control={<Radio size="small" />}
              label="International"
              labelPlacement="end"
            />
          </RadioGroup>
          {showProvinceOptions && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedCheckOption === "province"}
                  onChange={handleCheckboxChange}
                  value="province"
                  size="small"
                />
              }
              label="Specific Province"
            />
          )}
          {showCountryOptions && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedCheckOption === "country"}
                  onChange={handleCheckboxChange}
                  value="country"
                  size="small"
                />
              }
              label="Specific Country"
            />
          )}
        </FormControl>
        {selectedCheckOption === "province" && (
          <ZimbabweProvinceAutocomplete onSelect={handleProvincesChange} />
        )}
        {selectedCheckOption === "country" && (
          <Autocomplete
            options={countries}
            getOptionLabel={(option) => option.label}
            value={selectedCountry}
            onChange={handleCountrySelect}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select country"
                variant="outlined"
                size="small"
              />
            )}
          />
        )}
      </SidebarContainer>
      <Grid item xs={8}>
        <Paper>
          <Tabs value={selectedTab} onChange={handleTabChange}>
            <Tab label="Map" />
            <Tab label="Upcoming Court Cases" />
            <Tab label="Crime Type Summaries" />
            <Tab label="Outcome Summaries" />
          </Tabs>

          <TabPanelContainer>
            <TabPanel value={selectedTab} index={0}>
              <div className="heatmap-container">
                <ProvincialHeatmap
                  crimesData={crimesProvData}
                  maxValue={crimesMaxValue}
                />
              </div>
              <div>
                <ProvincialHeatmapTable data={crimesProvData} />
              </div>
            </TabPanel>
            <TabPanel value={selectedTab} index={1}></TabPanel>
            <TabPanel value={selectedTab} index={2}></TabPanel>
            <TabPanel value={selectedTab} index={3}>
              <div className="dash-container">
                <PieChart data={data} />
              </div>
              <div>
                <HorizontalPieChartTable data={data} />
              </div>
            </TabPanel>
          </TabPanelContainer>
        </Paper>
      </Grid>
      <SidebarContainer item xs={2}>
        <h3>Cases Feed</h3>
        <h1 className="heading">{total}</h1>

        <CrimeFeed crimes={crimes} onSelect={handleCrimeSelect} />
      </SidebarContainer>
    </MainContainer>
  );
};

export default Dashboard;
