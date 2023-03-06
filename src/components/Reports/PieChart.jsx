import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import html2canvas from "html2canvas";
import { Button, Container } from "@mui/material";

const PieChart = ({ data }) => {
  const chartRef = useRef(null);
  const tooltipRef = useRef(null);

  const divRef = useRef(null);

  const download = () => {
    html2canvas(divRef.current).then(function (canvas) {
      const link = document.createElement("a");
      link.download = "div.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  useEffect(() => {
    const width = 900;
    const height = 490;
    const circle_height = 700;
    const radius = (circle_height - 300) / 2;
    const svg = d3
      .select(chartRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 3}, ${height / 2})`)
      .style("background-color", "transparent");

    // Define color scale
    const colorScale = d3.scaleOrdinal(d3.schemeSet3);

    // Define pie generator
    const pie = d3
      .pie()
      .value((d) => d.value)
      .sort(null);

    // Define arc generator
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    // Define arcs for the pie chart
    const arcs = pie(data.map((d) => ({ key: d.label, value: d.value })));

    // Append the slices to the pie chart
    svg
      .selectAll("path")
      .data(arcs)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => colorScale(d.data.key))
      .on("mouseover", (event, d) => {
        const tooltip = d3.select(tooltipRef.current);

        tooltip
          .html(`${d.data.key}: ${d.data.value}`)
          .style("visibility", "visible");
      })
      .on("mousemove", (event) => {
        const tooltip = d3.select(tooltipRef.current);

        tooltip
          .style("top", event.pageY - 10 + "px")
          .style("left", event.pageX + 10 + "px");
      })
      .on("mouseout", () => {
        const tooltip = d3.select(tooltipRef.current);
        tooltip.style("visibility", "hidden");
      });

    // Add legend
    const legend = svg
      .selectAll(".legend")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr(
        "transform",
        (d, i) => `translate(${circle_height / 3.2},${i * 20})`
      );

    legend
      .append("rect")
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", (d) => colorScale(d.label));

    legend
      .append("text")
      .text((d) => `${d.label} (${d.value})`)
      .style("font-size", "12px")
      .attr("y", 12)
      .attr("x", 20);

    return () => {
      svg.selectAll("*").remove();
    };
  }, [data]);

  return (
    <div>
      <div className="piechart">
        <div ref={divRef}>
          <div>
            <svg ref={chartRef}></svg>
          </div>
          <div
            ref={tooltipRef}
            style={{
              position: "absolute",
              backgroundColor: "white",
              border: "1px solid black",
              padding: "5px",
              visibility: "hidden",
            }}
          ></div>
        </div>
      </div>
      <Button onClick={download}>Save as Image</Button>
    </div>
  );
};

export default PieChart;
