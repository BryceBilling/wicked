import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 70,
    hide: true,
    disableColumnMenu: true,
  },
  { field: "THF_Reference", headerName: "THF Reference", width: 130 },
  { field: "Date", headerName: "Date", width: 130 },
  { field: "CR_Number", headerName: "CR Number", width: 130 },
  { field: "DR_Number", headerName: "DR Number", width: 130 },
  { field: "RRB_Number", headerName: "RRB Number", width: 130 },
  { field: "Station", headerName: "Station", width: 130 },
  { field: "Anomily", headerName: "Anomily", width: 130 },
  { field: "Province", headerName: "Province", width: 130 },
  { field: "International", headerName: "International", width: 130 },
  { field: "Image", headerName: "Image", width: 130 },
  { field: "Crime_Type", headerName: "Crime Type", width: 130 },
  { field: "Exhibit_Details", headerName: "Exhibit Details", width: 130 },
  { field: "Qnty", headerName: "Quantity", width: 130 },
  { field: "Weight", headerName: "Weight", width: 130 },
  { field: "Location", headerName: "Location", width: 130 },
  {
    field: "Investigation_Officer",
    headerName: "Investigation Officer",
    width: 130,
  },
  {
    field: "Investigation_Officer_Cell",
    headerName: "Investigation Officer Cell",
    width: 130,
  },
  { field: "Other_Personnel", headerName: "Other Personnel", width: 130 },
];

const CrimesTable = () => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRows = async () => {
      const response = await axios.get("/api/all-crimes-reference");
      setRows(response.data);
      setFilteredRows(response.data);
    };
    fetchRows();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filteredRows = rows.filter((row) =>
      Object.values(row).join(" ").toLowerCase().includes(value.toLowerCase())
    );
    setFilteredRows(filteredRows);
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search..."
      />
      <DataGrid rows={filteredRows} columns={columns} pageSize={200} />
    </div>
  );
};

export default CrimesTable;
