import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import * as d3 from "d3";

const columns = [
  { field: "crime", headerName: "Crime", width: 200 },
  { field: "convicted9", headerName: "Convicted >= 9 Years", width: 220 },
  { field: "convictedLess9", headerName: "Convicted < 9 Years", width: 220 },
  { field: "acquitted", headerName: "Acquitted", width: 150 },
  { field: "warrant", headerName: "Warrant of Arrest", width: 200 },
  { field: "bail", headerName: "Bail Pending Appeal", width: 200 },
  {
    field: "furtherRemandRefused",
    headerName: "Further Remand Refused",
    width: 220,
  },
  { field: "pending", headerName: "Pending", width: 150 },
  { field: "dead", headerName: "Dead", width: 150 },
  { field: "escaped", headerName: "Escaped", width: 150 },
  { field: "remanded", headerName: "Remanded", width: 150 },
  { field: "fine", headerName: "Fined and/or Community Service", width: 250 },
];

const CrimesTypeChart = ({ data }) => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        autoHeight
      />
    </div>
  );
};

export default CrimesTypeChart;
