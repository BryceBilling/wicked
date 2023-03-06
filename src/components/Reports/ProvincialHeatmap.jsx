import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import zimbabweProvinces from "../../assets/zwe-province.json";
import html2canvas from "html2canvas";
import { Button } from "@mui/material";

const ProvincialHeatmap = ({ crimesData, maxValue }) => {
  const chartRef = useRef(null);
  const tooltipRef = useRef(null);
  const divRef = useRef(null);

  const download = () => {
    html2canvas(divRef.current).then(function (canvas) {
      const link = document.createElement("a");
      link.download = "provincial-heatmap.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  const width = 800;
  const height = 600;

  const legendRectSize = 15;

  const downloadMapWithLegend = () => {};

  useEffect(() => {
    const svg = d3.select(chartRef.current);

    const projection = d3
      .geoMercator()
      .fitSize([width, height], zimbabweProvinces);

    const path = d3.geoPath().projection(projection);

    const colorScale = d3
      .scaleSequential(d3.interpolateYlOrRd)
      .domain([0, maxValue]);

    const crimesByProvince = {};
    crimesData.forEach((d) => {
      crimesByProvince[d.province] = d.count;
    });

    svg
      .selectAll("path")
      .data(zimbabweProvinces.features)
      .join("path")
      .attr("d", path)
      .attr("stroke", "black")
      .attr("fill", (d) => {
        const count = crimesByProvince[d.properties.name_1] || 0;
        return colorScale(count);
      })
      .on("mouseover", function (event, d) {
        const count = crimesByProvince[d.properties.name_1] || 0;
        const tooltip = d3.select(tooltipRef.current);
        tooltip
          .html(`<div>${d.properties.name_1}: ${count} crimes</div>`)
          .style("visibility", "visible");
        d3.select(this)
          .attr("transform", "translate(-2,-2)")
          .style("opacity", 0.8);
      })
      .on("mouseout", function () {
        const tooltip = d3.select(tooltipRef.current);
        tooltip.style("visibility", "hidden");
        d3.select(this).attr("transform", "").style("opacity", 1);
      });

    // Legend

    const legend = svg.append("g").attr("class", "legend");

    const legendValues = colorScale.ticks(6).reverse();

    var legendColors = [];
    for (var i = 0; i < legendValues.length; i++) {
      legendColors.push(colorScale(legendValues[i]));
    }

    legend
      .selectAll(".legend-item")
      .data(legendValues)
      .join("g")
      .attr("class", "legend-item")
      .attr("transform", (d, i) => `translate(0, ${i * (legendRectSize + 5)})`)
      .call((g) =>
        g
          .append("rect")
          .attr("width", legendRectSize)
          .attr("height", legendRectSize)
          .attr("fill", (d, i) => legendColors[i])
      )
      .call((g) =>
        g
          .append("text")
          .attr("x", legendRectSize + 5)
          .attr("y", legendRectSize - 2)
          .attr("dominant-baseline", "middle")
          .text((d) => d.toFixed(0))
      );

    // Show legend only during download

    return () => {
      // cleanup
      svg.selectAll("*").remove();
    };
  }, [crimesData]);

  return (
    <div style={{ position: "relative" }}>
      <div ref={divRef}>
        <svg ref={chartRef} width={800} height={600}></svg>

        <div
          ref={tooltipRef}
          style={{
            padding: "8px",
            width: "18rem",
            backgroundColor: "white",
            border: "1px solid black",
            visibility: "hidden",
          }}
        ></div>
      </div>
      <Button onClick={download} className="download-btn">
        Download
      </Button>
    </div>
  );
};

export default ProvincialHeatmap;
