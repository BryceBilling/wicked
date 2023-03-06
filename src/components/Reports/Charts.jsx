import React from "react";
import "../../styles/charts.scss";

export default function Charts() {
  return (
    <div class="background">
      <div class="btn-group-sm container-fluid content" role="group">
        <div class="mb-2">
          <label for="datepicker">Select Date Range:</label>
          <input id="datepicker" class="row-cols-2" />
        </div>
        <div class="buttons-container">
          <button
            class="btn btn-outline-secondary row-cols-5 main-button"
            id="line-action-btn"
          >
            Generate Conviction Challenge Trends (Yearly)
          </button>
          <button
            class="btn btn-outline-secondary row-cols-5 main-button"
            id="court-conviction-action-btn"
          >
            Generate Court Case Status (Conviction/Finalisation Dates)
          </button>
          <button
            class="btn btn-outline-secondary row-cols-5 main-button"
            id="court-action-btn"
          >
            Generate Court Case Status
          </button>
          <button
            class="btn btn-outline-secondary row-cols-5 main-button"
            id="pangolin-accused-action-btn"
          >
            Generate Ratio of Accused in Pangolin Cases
          </button>
          <button
            class="btn btn-outline-secondary row-cols-5 main-button"
            id="ivory-accused-action-btn"
          >
            Generate Ratio of Accused Status in Ivory Cases
          </button>
          <button
            class="btn btn-outline-secondary row-cols-5 main-button"
            id="rhino-accused-action-btn"
          >
            Generate Ratio of Accused Status in Rhino Cases
          </button>
        </div>
        <div class="mt-2 mb-4 text-center print">
          <button class="btn btn-outline-secondary" id="print-btn">
            Save as PNG
          </button>
        </div>
      </div>
      <div id="main">
        <div class="spinner-border visually-hidden" id="loading" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <img class="bg-img" src="../assets/images/THF_Logo.png" alt="" />
        <h3 id="heading" class="text-center"></h3>
        <h5 id="date" class="text-center"></h5>

        <div id="table-container" class="table-responsive"></div>
        <div id="chart"></div>
      </div>
    </div>
  );
}
