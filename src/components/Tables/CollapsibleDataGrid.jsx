import * as React from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Tooltip } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import * as XLSX from "xlsx/xlsx.mjs";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
    sortable: false,
    hide: true,
  },
  {
    field: "THF_Reference",
    headerName: "THF Reference",
    width: 100,
    sortable: false,
    hide: true,
  },
  {
    field: "Date",
    headerName: "Date",
    width: 200,
    sortable: true,
  },
  {
    field: "CR_Number",
    headerName: "CR Number",
    width: 200,
    sortable: false,
  },
  {
    field: "DR_Number",
    headerName: "DR Number",
    width: 100,
    sortable: false,
  },
  {
    field: "RRB_Number",
    headerName: "RRB Number",
    width: 150,
    sortable: false,
  },
  {
    field: "Crime_Type",
    headerName: "Crime Type",
    width: 150,
  },
  {
    field: "Station",
    headerName: "Station",
    width: 150,
  },
  {
    field: "Province",
    headerName: "Province",
    width: 150,
  },
  {
    field: "Exhibit_Details",
    headerName: "Exhibit Details",
    width: 150,
    sortable: false,
  },
  {
    field: "Qnty",
    headerName: "Quantity",
    width: 150,
    sortable: false,
  },
  {
    field: "Weight",
    headerName: "Weight",
    width: 150,
    sortable: false,
  },
  {
    field: "Location",
    headerName: "Location",
    width: 150,
  },
];

const subColumns = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
    sortable: false,
    hide: true,
  },
  {
    field: "Name",
    headerName: "Name",
    width: 200,
  },
  {
    field: "Surname",
    headerName: "Surname",
    width: 200,
    sortable: true,
  },
  {
    field: "Sex",
    headerName: "Sex",
    width: 100,
  },
  {
    field: "Nationality",
    headerName: "Nationality",
    width: 200,
  },
  {
    field: "National_Registration",
    headerName: "National Registration",
    width: 200,
    sortable: false,
  },
  {
    field: "Passport",
    headerName: "Passport Number",
    width: 150,
    sortable: false,
  },
  {
    field: "Age",
    headerName: "DOB/Age",
    width: 100,
    sortable: false,
  },
  {
    field: "Phone_Number",
    headerName: "Phone Number",
    width: 150,
    sortable: false,
  },
  {
    field: "Business_Address",
    headerName: "Business Address",
    width: 300,
    sortable: false,
  },
  {
    field: "Residential_Address",
    headerName: "Residential Address",
    width: 300,
    sortable: false,
  },
  {
    field: "Offence",
    headerName: "Offence",
    width: 200,
    sortable: false,
  },
  {
    field: "Accused_Court_Reference_Number",
    headerName: "CRB Number",
    width: 150,
    sortable: false,
  },
  {
    field: "Magistrate",
    headerName: "Magistrate",
    width: 120,
    sortable: false,
  },
];

const CollapsibleDataGrid = ({ rows, columns, subColumns }) => {
  const [openRows, setOpenRows] = useState(new Set());
  console.log(rows);

  const handleRowClick = (row) => {
    const isOpen = openRows.has(row.id);
    const newOpenRows = new Set(openRows);
    if (isOpen) {
      newOpenRows.delete(row.id);
    } else {
      newOpenRows.add(row.id);
    }
    setOpenRows(newOpenRows);
  };

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, "data.xlsx");
  };

  const rowRender = (params) => {
    const isOpen = openRows.has(params.id);
    return (
      <>
        <IconButton
          size="small"
          onClick={(event) => {
            event.stopPropagation();
            handleRowClick(params.row);
          }}
        >
          {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
        {params.value}
      </>
    );
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns.map((column) => {
          if (subColumns) {
            return {
              ...column,
              valueGetter: (params) =>
                subColumns.map((subColumn) => params.row[subColumn]),
              renderCell: rowRender,
            };
          }
          return column;
        })}
        components={{
          TableCell: ({ value, ...other }) => {
            if (other.field.includes(".")) {
              return <td {...other}>{value.join(", ")}</td>;
            }
            return <td {...other}>{value}</td>;
          },
          // Example of custom row renderer
          Row: ({ row, ...other }) => {
            return (
              <tr
                onClick={() => handleRowClick(row)}
                style={{
                  cursor: "pointer",
                  backgroundColor: openRows.has(row.id) ? "#f0f0f0" : "white",
                }}
                {...other}
              />
            );
          },
        }}
      />
      <Tooltip title="Export">
        <IconButton onClick={handleExport}>Export</IconButton>
      </Tooltip>
    </div>
  );
};

export default CollapsibleDataGrid;
