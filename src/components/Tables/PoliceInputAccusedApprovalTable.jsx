import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

export default function PoliceInputAccusedApprovalTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get("/api/police-input-accused").then((response) => {
      setRows(response.data);
    });
  }, []);

  const handleRowApprove = (id) => {
    axios
      .patch(`/api/police-input-accused/${id}`, { approved: true })
      .then(() => {
        const updatedRows = rows.map((row) =>
          row.id === id ? { ...row, approved: true } : row
        );
        setRows(updatedRows);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const columns = [
    { field: "id", headerName: "ID", hide: true },
    { field: "Name", headerName: "Name", flex: 1, editable: true },
    { field: "Surname", headerName: "Surname", flex: 1, editable: true },
    {
      field: "Nationality",
      headerName: "Nationality",
      flex: 1,
      editable: true,
    },
    { field: "Sex", headerName: "Sex", flex: 1, editable: true },
    {
      field: "National_Registration",
      headerName: "National Registration",
      flex: 1,
      editable: true,
    },
    { field: "Age", headerName: "Age", flex: 1, editable: true },
    {
      field: "Phone_Number",
      headerName: "Phone Number",
      flex: 1,
      editable: true,
    },
    {
      field: "Business_Address",
      headerName: "Business Address",
      flex: 1,
      editable: true,
    },
    {
      field: "Residential_Address",
      headerName: "Residential Address",
      flex: 1,
      editable: true,
    },
    { field: "Chief", headerName: "Chief", flex: 1, editable: true },
    {
      field: "Extra_Information",
      headerName: "Extra Information",
      flex: 1,
      editable: true,
    },
    {
      field: "High_Profile",
      headerName: "High Profile",
      type: "boolean",
      flex: 1,
      editable: true,
    },
    {
      field: "Chief_Village",
      headerName: "Chief Village",
      flex: 1,
      editable: true,
    },
    {
      field: "Passport_Number",
      headerName: "Passport Number",
      flex: 1,
      editable: true,
    },
    {
      field: "Marital_Status",
      headerName: "Marital Status",
      flex: 1,
      editable: true,
    },
    {
      field: "approved",
      headerName: "",
      sortable: false,
      filterable: false,
      width: 80,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        if (params.row.approved) {
          return <CheckIcon />;
        } else {
          const onClick = () => {
            handleRowApprove(params.row.id);
          };
          return <RadioButtonUncheckedIcon onClick={onClick} />;
        }
      },
    },
    {
      field: "delete",
      headerName: "",
      sortable: false,
      filterable: false,
      width: 80,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = () => {
          handleRowDelete(params.row.id);
        };

        return <DeleteIcon onClick={onClick} />;
      },
    },
  ];

  const handleRowDelete = (id) => {
    axios
      .delete(`/api/police-input-accused/${id}`)
      .then(() => {
        setRows(rows.filter((row) => row.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        disableSelectionOnClick
      />
    </div>
  );
}
