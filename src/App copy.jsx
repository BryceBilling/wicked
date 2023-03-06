import viteLogo from "./assets/vite.svg";
import reactLogo from "./assets/react.svg";
import sassLogo from "./assets/sass.svg";
import githubLogo from "./assets/github.svg";
import "./App.scss";
import Charts from "./components/Reports/Charts";

import ExhibitTable from "./components/Tables/ExhibitsTable";
import PeopleTable from "./components/Tables/PeopleTable";
import CrimeForm from "./components/Input/CrimeInput";
import ProvincialHeatmap from "./components/Reports/ProvincialHeatmap";
import CrimesTypeChart from "./components/Reports/CrimeTypeChart";
import PieChart from "./components/Reports/PieChart";
import PieChartTable from "./components/Tables/HorizontalPieChartTable";
import Dashboard from "./pages/Dashboard";
import PoliceInputAccusedApprovalTable from "./components/Tables/PoliceInputAccusedApprovalTable";

function App() {
  const resultsData = [
    {
      id: 1,
      crime: "Murder",
      convicted9: 10,
      convictedLess9: 20,
      acquitted: 5,
      warrant: 2,
      bail: 3,
      furtherRemandRefused: 1,
      pending: 6,
      dead: 0,
      escaped: 1,
      remanded: 4,
      fine: 10,
      communityService: 5,
    },
    {
      id: 3,
      crime: "Robbery",
      convicted9: 20,
      convictedLess9: 30,
      acquitted: 3,
      warrant: 5,
      bail: 10,
      furtherRemandRefused: 2,
      pending: 10,
      dead: 0,
      escaped: 3,
      remanded: 6,
      fine: 15,
      communityService: 7,
    },
    {
      id: 4,
      crime: "Assault",
      convicted9: 30,
      convictedLess9: 50,
      acquitted: 8,
      warrant: 1,
      bail: 6,
      furtherRemandRefused: 4,
      pending: 5,
      dead: 0,
      escaped: 2,
      remanded: 10,
      fine: 20,
      communityService: 8,
    },
    {
      id: 5,
      crime: "Theft",
      convicted9: 15,
      convictedLess9: 25,
      acquitted: 2,
      warrant: 3,
      bail: 5,
      furtherRemandRefused: 1,
      pending: 3,
      dead: 0,
      escaped: 0,
      remanded: 3,
      fine: 12,
      communityService: 3,
    },
    {
      id: 6,
      crime: "Fraud",
      convicted9: 5,
      convictedLess9: 10,
      acquitted: 6,
      warrant: 0,
      bail: 1,
      furtherRemandRefused: 0,
      pending: 4,
      dead: 0,
      escaped: 0,
      remanded: 2,
      fine: 7,
      communityService: 2,
    },
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

  return (
    <div className="App">
      <div>
        {/* <Charts /> */}
        {/* <CrimesTable /> */}
        {/* <ExhibitTable /> */}
        {/* <PeopleTable /> */}
        {/* <CrimeForm /> */}
        {/* <ProvincesMap /> */}
        {/* <ProvincialHeatmap crimesData={crimesData} /> */}
        {/* <CrimesTypeChart data={resultsData} /> */}
        {/* <PieChart data={data} /> */}
        {/* <PieChartTable data={data} /> */}
        {/* <Dashboard /> */}
        <PoliceInputAccusedApprovalTable />
      </div>
    </div>
  );
}

export default App;
