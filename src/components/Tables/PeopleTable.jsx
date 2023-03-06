import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";

export default function PeopleTable() {
  const [loading, setLoading] = useState(false);
  const [peopleData, setPeopleData] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 70, hide: true, hideable: false },
    { field: "THF_Reference", headerName: "THF Reference", width: 160 },
    {
      field: "Name",
      headerName: "Name",
      width: 300,
    },
    {
      field: "Surname",
      headerName: "Surname",
      width: 300,
    },
    {
      field: "Nationality",
      headerName: "Nationality",
      width: 200,
    },
    {
      field: "Sex",
      headerName: "Sex",
      width: 150,
    },
    {
      field: "National_Registration",
      headerName: "National Registration",
      width: 180,
    },
    {
      field: "Passport_Number",
      headerName: "Passport Number",
      width: 180,
    },
    {
      field: "Age",
      headerName: "Age",
      width: 150,
    },
    {
      field: "Phone Number",
      headerName: "Phone Number",
      width: 200,
    },
    {
      field: "Business_Address",
      headerName: "Business Address",
      width: 250,
    },
    {
      field: "Physical Address",
      headerName: "Physical Address",
      width: 400,
    },
    {
      field: "Chief",
      headerName: "Chief",
      width: 190,
    },
    {
      field: "Chief_Village",
      headerName: "Chief Village",
      width: 190,
    },
    {
      field: "Extra_Information",
      headerName: "Extra Information",
      width: 250,
    },
  ];

  async function getInfo() {
    const crimes = await axios("/api/all-people");
    setLoading(true);
    setPeopleData([]);
    var allCrimes = crimes.data;
    setPeopleData(allCrimes);
    setLoading(false);
  }
  useEffect(() => {
    (async () => {
      await getInfo();
    })();
  }, []);

  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <h2 className="heading">Accused</h2>
      <DataGrid
        className="people-table"
        rows={peopleData}
        columns={columns}
        loading={loading}
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
}
