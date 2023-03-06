import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import axios from "axios";
import moment from "moment";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.THF_Reference}
        </TableCell>
        <TableCell>{moment(row.Date).format("DD/MM/YYYY")}</TableCell>
        <TableCell>{row.CR_Number}</TableCell>
        <TableCell>{row.DR_Number}</TableCell>
        <TableCell>{row.RRB_Number}</TableCell>
        <TableCell className="medium-cell">
          {row.Crime_Type.replaceAll(" | ", "\n")}
        </TableCell>
        <TableCell>{row.Station}</TableCell>
        <TableCell>{row.Province}</TableCell>
        <TableCell className="large-cell">
          {row.Exhibit_Details && row.Exhibit_Details.replaceAll(",", "\n")}
        </TableCell>
        <TableCell>{row.Qnty && row.Qnty.replaceAll(",", "\n")}</TableCell>
        <TableCell className="medium-cell">
          {row.Weight && row.Weight.replaceAll(",", "\n")}
        </TableCell>
        <TableCell className="medium-cell">
          {row.Location && row.Location.replaceAll(",", "\n")}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={14}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Typography variant="h6" gutterBottom component="div">
                Accused
              </Typography>
              <Table className="accused-table" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Surname</TableCell>
                    <TableCell>Sex</TableCell>
                    <TableCell>Nationality</TableCell>
                    <TableCell>National_Registration</TableCell>
                    <TableCell>Passport</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell>Business Address</TableCell>
                    <TableCell>Residential Address</TableCell>
                    <TableCell className="large-cell">Offence</TableCell>
                    <TableCell className="large-cell">Outcome</TableCell>
                    <TableCell>CRB Number</TableCell>
                    <TableCell>Court</TableCell>
                    <TableCell>Magistrate</TableCell>
                    <TableCell>Public Prosecutor</TableCell>
                    <TableCell>PP Reference</TableCell>
                    <TableCell>Lawyer</TableCell>
                    <TableCell>Possible Date of Release</TableCell>
                    <TableCell>Date Convicted</TableCell>
                    <TableCell>Remanded Date</TableCell>
                    <TableCell>Convicted Length</TableCell>
                    <TableCell>Finalisation Date</TableCell>
                    <TableCell>Previous Remand Dates</TableCell>
                    <TableCell>Chief</TableCell>
                    <TableCell>Chief Village</TableCell>
                    <TableCell>Extra Information</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.accused &&
                    row.accused.map((accusedRow) => (
                      <TableRow key={accusedRow.Person_ID}>
                        <TableCell component="th" scope="row">
                          {accusedRow.Name}
                        </TableCell>
                        <TableCell>{accusedRow.Surname}</TableCell>
                        <TableCell>{accusedRow.Nationality}</TableCell>
                        <TableCell>{accusedRow.Sex}</TableCell>
                        <TableCell>
                          {accusedRow.National_Registration}
                        </TableCell>
                        <TableCell>{accusedRow.Passport}</TableCell>
                        <TableCell>{accusedRow.Age}</TableCell>
                        <TableCell>{accusedRow.Phone_Number}</TableCell>
                        <TableCell>{accusedRow.Business_Address}</TableCell>
                        <TableCell>{accusedRow.Residential_Address}</TableCell>
                        <TableCell className="large-cell">
                          {accusedRow.Offence}
                        </TableCell>
                        <TableCell className="large-cell">
                          {accusedRow.Case_outcome}
                        </TableCell>
                        <TableCell>
                          {row.Accused_Court_Reference_Number}
                        </TableCell>
                        <TableCell>{row.Court_Where_Case_Was_Tried}</TableCell>
                        <TableCell>{row.Magistrate}</TableCell>
                        <TableCell>{row.Public_Prosecutor}</TableCell>
                        <TableCell>{row.Public_Prosecutor_Reference}</TableCell>
                        <TableCell>{row.Lawyer}</TableCell>
                        <TableCell>
                          {accusedRow.Possible_Date_Of_Release}
                        </TableCell>
                        <TableCell>{accusedRow.Date_Convicted}</TableCell>
                        <TableCell>{accusedRow.Remanded_Date}</TableCell>
                        <TableCell>{accusedRow.Conviction_Length}</TableCell>
                        <TableCell>{accusedRow.Finalisation_Date}</TableCell>
                        <TableCell>
                          {accusedRow.Previous_Remand_Dates}
                        </TableCell>
                        <TableCell>{accusedRow.Chief}</TableCell>
                        <TableCell>{accusedRow.Chief_Village}</TableCell>
                        <TableCell>{accusedRow.Extra_Information}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CrimesTable() {
  const [crimesData, setCrimesData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [total, setTotal] = useState(0);

  async function getAccused(index, reference) {
    const accused = await axios.post("/api/crimes-accused", {
      reference,
    });
    const accusedData = accused.data;
    return accusedData;
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    const start = rowsPerPage * newPage + 1;
    const temp = start + rowsPerPage - 1;
    var end = temp;
    if (temp > total) {
      end = total;
    }
    getInfo(start, end);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    getInfo(0, event.target.value);
  };

  async function getInfo(start, end) {
    const crimes = await axios.post("/api/all-crimes-reference", {
      start,
      end,
    });
    setCrimesData([]);
    var allCrimes = crimes.data;
    for (var i = 0; i < crimes.data.length; i++) {
      const accused = await getAccused(i, crimes.data[i].THF_Reference);
      allCrimes[i].accused = accused;
    }
    setCrimesData(allCrimes);
    const count = await axios("/api/all-crimes-count");
    setTotal(count.data[0].total);
  }
  useEffect(() => {
    (async () => {
      await getInfo(0, rowsPerPage);
    })();
  }, []);
  return (
    <Paper
      sx={{
        width: "96vw",
        height: "95vh",
        marginLeft: "2rem",
        marginTop: "1rem",
      }}
    >
      <div style={{ width: "100%" }}>
        <h2 className="heading">Crimes Summary</h2>
      </div>
      <TableContainer sx={{ maxHeight: "92%" }}>
        <Table stickyHeader aria-label="sticky table" className="crime-table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>THF Reference</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>CR Number</TableCell>
              <TableCell>DR Number</TableCell>
              <TableCell>RRB Number</TableCell>
              <TableCell className="large-cell">Crime Type</TableCell>
              <TableCell>Station</TableCell>
              <TableCell>Province</TableCell>
              <TableCell className="large-cell">Exhibit_Details</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell className="medium-cell">Weight</TableCell>
              <TableCell className="medium-cell">Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {crimesData.length > 0 &&
              crimesData.map((row) => (
                <Row key={row.id + "" + row.THF_Reference} row={row} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[
          10,
          250,
          500,
          2000,
          { value: total, label: "All" },
        ]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
