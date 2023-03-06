var echarts = require("echarts");
var myChart = echarts.init(document.getElementById("chart"));

function clear() {
  myChart.clear();
  document.getElementById("table-container").replaceChildren();
}

function createTable(tableData) {
  var table = document.createElement("table");
  table.classList.add("table");
  table.classList.add("table-striped");
  var tableBody = document.createElement("tbody");
  var tableHeader = document.createElement("thead");
  table.classList.add("table-body");
  var headingTitle = [
    "Year",
    "Convicted but Bail Awarded Pending Appeal",
    "Not Concluded Due to Further Remand Refused",
    "Not Concluded Due to Warrant of Arrest",
  ];
  //tableData.splice(0,0,heading);
  var count = 0;
  for (var a = 0; a < headingTitle.length; a++) {
    var cell = document.createElement("th");
    cell.appendChild(document.createTextNode(headingTitle[a]));
    tableHeader.appendChild(cell);
  }

  for (var i = 0; i < tableData[count].length; i++) {
    var tag = "tr";
    var row = document.createElement(tag);

    for (var j = 0; j < tableData.length; j++) {
      var cell = document.createElement("td");
      cell.appendChild(document.createTextNode(tableData[j][i]));
      row.appendChild(cell);
    }
    tableBody.appendChild(row);
  }
  table.appendChild(tableHeader);
  table.appendChild(tableBody);
  document.getElementById("table-container").appendChild(table);
}

function showLoading() {
  document.getElementById("loading").classList.remove("visually-hidden");
}

function hideLoading() {
  document.getElementById("loading").classList.add("visually-hidden");
}

function createTable1DConviction(data) {
  var table = document.createElement("table");
  table.classList.add("table");
  table.classList.add("table-striped");
  var tableBody = document.createElement("tbody");
  table.classList.add("table-body-pie");
  var headingTitle = [
    "Convicted =/> 9 years",
    "Convicted < 9 years",
    "Acquitted",
    "Dead",
    "Fined/Comm Service",
  ];
  var temp = [];
  temp.push(headingTitle);
  temp.push(data);
  for (var i = 0; i < temp[0].length; i++) {
    var tag = "tr";
    var row = document.createElement(tag);
    row.classList.add("row-pie");

    for (var j = 0; j < temp.length; j++) {
      var cell = document.createElement("td");
      cell.classList.add("cell");
      cell.appendChild(document.createTextNode(temp[j][i]));
      row.appendChild(cell);
    }
    tableBody.appendChild(row);
  }
  table.appendChild(tableBody);
  document.getElementById("table-container").appendChild(table);
}

function createTable1D(data) {
  var table = document.createElement("table");
  table.classList.add("table");
  table.classList.add("table-striped");
  var tableBody = document.createElement("tbody");
  table.classList.add("table-body-pie");
  var headingTitle = [
    "Convicted =/> 9 years",
    "Convicted < 9 years",
    "Acquitted",
    "Convicted - BPA",
    "Pending - FRR",
    "Pending - WoA",
    "Pending - Remand",
    "Dead",
    "Fined/Comm Service",
    "Escaped",
  ];
  var temp = [];
  temp.push(headingTitle);
  temp.push(data);
  for (var i = 0; i < temp[0].length; i++) {
    var tag = "tr";
    var row = document.createElement(tag);
    row.classList.add("row-pie");

    for (var j = 0; j < temp.length; j++) {
      var cell = document.createElement("td");
      cell.classList.add("cell");
      cell.appendChild(document.createTextNode(temp[j][i]));
      row.appendChild(cell);
    }
    tableBody.appendChild(row);
  }
  table.appendChild(tableBody);
  document.getElementById("table-container").appendChild(table);
}
