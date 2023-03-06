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

const VerticalPieChartTable = ({ data }) => {
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
  return (
    <div>
      <div>
        <TableContainer component={Paper} className="pie-chart-table">
          <Table aria-label="data table" ref={tableRef}>
            <TableHead>
              <TableRow>
                <TableCell className="heading">Result</TableCell>
                <TableCell align="right" className="heading">
                  Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.label}>
                  <TableCell component="th" scope="row">
                    {row.label}
                  </TableCell>
                  <TableCell align="right">{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Button onClick={handleSaveAsImage} className="download-btn">
        Save as Image
      </Button>
    </div>
  );
};

export default VerticalPieChartTable;
