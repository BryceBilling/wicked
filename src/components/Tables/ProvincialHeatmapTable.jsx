import React, { useRef, useState } from "react";
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

const ProvincialHeatmapTable = ({ data }) => {
  const columns = data.map((row) => row.province);
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
        <TableContainer
          component={Paper}
          className="heatmap-table"
          id="heatmap-table"
        >
          <Table ref={tableRef}>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell key={index}>{column}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {data.map((row, index) => (
                  <TableCell key={index}>{row.count}</TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "16px",
        }}
      >
        <Button onClick={handleSaveAsImage} className="download-btn">
          Save as Image
        </Button>
      </div>
    </div>
  );
};

export default ProvincialHeatmapTable;
