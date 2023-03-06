import React, { useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import domToImage from "dom-to-image-more";
import download from "downloadjs";

const HorizontalPieChartTable = ({ data }) => {
  const tableRef = useRef();

  const handleSaveAsImage = async () => {
    const table = tableRef.current;

    try {
      const dataUrl = await domToImage.toPng(table, { bgcolor: "#fff" });
      download(dataUrl, "provincial-heatmap-table.png");
    } catch (error) {
      console.error("Error saving table as image:", error);
    }
  };

  const tableHeadings = data.map((row) => (
    <TableCell key={row.label} className="heading">
      {row.label}
    </TableCell>
  ));

  const tableData = data.map((row) => (
    <TableCell key={row.label} align="right">
      {row.value}
    </TableCell>
  ));

  return (
    <div>
      <TableContainer component={Paper} className="pie-chart-table">
        <Table aria-label="data table" ref={tableRef}>
          <TableHead>
            <TableRow>{tableHeadings}</TableRow>
          </TableHead>
          <TableBody>
            <TableRow>{tableData}</TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={handleSaveAsImage} className="download-btn">
        Save as Image
      </Button>
    </div>
  );
};

export default HorizontalPieChartTable;
