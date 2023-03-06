import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";

export default function ExhibitTable() {
  const [loading, setLoading] = useState(false);
  const [exhibitData, setExhibitData] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 70, hide: true, hideable: false },
    { field: "THF_Reference", headerName: "THF Reference", width: 160 },
    {
      field: "Exhibit_Details",
      headerName: "Exhibit Details",
      width: 300,
      valueGetter: (params) =>
        `${
          params.row.Exhibit_Details &&
          params.row.Exhibit_Details.replaceAll(",", "\n")
        }`,
    },
    {
      field: "Qnty",
      headerName: "Quantity",
      width: 120,
      valueGetter: (params) =>
        `${
          params.row.Qnty &&
          params.row.Qnty.replaceAll(",", "\n").replaceAll(" ", "")
        }`,
    },
    {
      field: "Weight",
      headerName: "Weight",
      width: 150,
      valueGetter: (params) =>
        `${params.row.Weight && params.row.Weight.replaceAll(",", "\n")}`,
    },
    {
      field: "Crime_Type",
      headerName: "Crime Type",
      width: 300,
      valueGetter: (params) =>
        `${
          params.row.Crime_Type && params.row.Crime_Type.replaceAll(" | ", "\n")
        }`,
    },
  ];

  async function getInfo() {
    const crimes = await axios("/api/all-crimes-exhibits");
    setLoading(true);
    setExhibitData([]);
    var allCrimes = crimes.data;
    setExhibitData(allCrimes);
    setLoading(false);
  }
  useEffect(() => {
    (async () => {
      await getInfo();
    })();
  }, []);

  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <h2 className="heading">Exhibits Summary</h2>
      <DataGrid
        className="exhibit-table"
        rows={exhibitData}
        columns={columns}
        loading={loading}
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
}
