el("court-action-btn").addEventListener("click", function () {
  clear();
  showLoading();
  document.getElementById("heading").innerHTML = "Court Case Status";
  document.getElementById("date").innerHTML =
    getStartString() + " to " + getEndString();
  // Get the mysql service
  getCourtCaseStatus(function (rows) {
    createTable1D(rows);
    var option = {
      title: {
        text: "Court Case Status",
        subtext: "Total\n" + getStartString() + " to " + getEndString(),
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      toolbox: {
        show: true,
        right: "10%",
        feature: {
          dataView: {
            show: true,
            title: "Data View",
          },
          saveAsImage: {
            show: true,
            title: "Save As Image",
          },
        },
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "Court Case Status",
          type: "pie",
          radius: "50%",
          label: {
            formatter: "{b}: {@2012} ({d}%)",
          },
          data: [
            { value: rows[0], name: "Convicted =/> 9 years  " },
            { value: rows[1], name: "Convicted < 9 years  " },
            { value: rows[2], name: "Acquitted  " },
            { value: rows[3], name: "Convicted - BPA  " },
            { value: rows[4], name: "Pending - FRR  " },
            { value: rows[5], name: "Pending - WoA  " },
            { value: rows[6], name: "Pending - Remand  " },
            { value: rows[7], name: "Dead  " },
            { value: rows[8], name: "Fined/Comm Service  " },
            { value: rows[9], name: "Escaped  " },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
    hideLoading();
    myChart.setOption(option);
  }, "none");
});

el("court-conviction-action-btn").addEventListener("click", function () {
  clear();
  showLoading();
  document.getElementById("heading").innerHTML =
    "Court Case Status (Conviction/Finalisation Date)";
  document.getElementById("date").innerHTML =
    getStartString() + " to " + getEndString();
  // Get the mysql service
  getCourtCaseStatusConviction(function (rows) {
    createTable1DConviction(rows);
    var option = {
      title: {
        text: "Court Case Status (Conviction/Finalisation Date)",
        subtext: "Total\n" + getStartString() + " to " + getEndString(),
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      toolbox: {
        show: true,
        right: "10%",
        feature: {
          dataView: {
            show: true,
            title: "Data View",
          },
          saveAsImage: {
            show: true,
            title: "Save As Image",
          },
        },
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "Court Case Status",
          type: "pie",
          radius: "50%",
          label: {
            formatter: "{b}: {@2012} ({d}%)",
          },
          data: [
            { value: rows[0], name: "Convicted =/> 9 years  " },
            { value: rows[1], name: "Convicted < 9 years  " },
            { value: rows[2], name: "Acquitted  " },
            { value: rows[3], name: "Dead  " },
            { value: rows[4], name: "Fined/Comm Service  " },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
    hideLoading();
    myChart.setOption(option);
  }, "none");
});

el("pangolin-accused-action-btn").addEventListener("click", function () {
  clear();
  showLoading();
  document.getElementById("heading").innerHTML =
    "Ratio of Accused in Pangolin Cases";
  document.getElementById("date").innerHTML =
    getStartString() + " to " + getEndString();
  // Get the mysql service
  getCourtCaseStatus(function (rows) {
    createTable1D(rows);
    var option = {
      title: {
        text: "Court Case Status",
        subtext: "Pangolin\n" + getStartString() + " to " + getEndString(),
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      toolbox: {
        show: true,
        right: "10%",
        feature: {
          dataView: {
            show: true,
            title: "Data View",
          },
          saveAsImage: {
            show: true,
            title: "Save As Image",
          },
        },
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "Court Case Status",
          type: "pie",
          radius: "50%",
          label: {
            formatter: "{b}: {@2012} ({d}%)",
          },
          data: [
            { value: rows[0], name: "Convicted =/> 9 years  " },
            { value: rows[1], name: "Convicted < 9 years  " },
            { value: rows[2], name: "Acquitted  " },
            { value: rows[3], name: "Convicted - BPA  " },
            { value: rows[4], name: "Pending - FRR  " },
            { value: rows[5], name: "Pending - WoA  " },
            { value: rows[6], name: "Pending - Remand  " },
            { value: rows[7], name: "Dead  " },
            { value: rows[8], name: "Fined/Comm Service  " },
            { value: rows[9], name: "Escaped  " },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
    hideLoading();
    myChart.setOption(option);
  }, "Pangolin");
});

el("ivory-accused-action-btn").addEventListener("click", function () {
  clear();
  showLoading();
  // Get the mysql service
  document.getElementById("heading").innerHTML =
    "Ratio of Accused in Ivory Cases";
  document.getElementById("date").innerHTML =
    getStartString() + " to " + getEndString();
  getCourtCaseStatus(function (rows) {
    createTable1D(rows);
    var option = {
      title: {
        text: "Court Case Status",
        subtext: "Ivory\n" + getStartString() + " to " + getEndString(),
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      toolbox: {
        show: true,
        right: "10%",
        feature: {
          dataView: {
            show: true,
            title: "Data View",
          },
          saveAsImage: {
            show: true,
            title: "Save As Image",
          },
        },
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "Court Case Status",
          type: "pie",
          radius: "50%",
          label: {
            formatter: "{b}: {@2012} ({d}%)",
          },
          data: [
            { value: rows[0], name: "Convicted =/> 9 years  " },
            { value: rows[1], name: "Convicted < 9 years  " },
            { value: rows[2], name: "Acquitted  " },
            { value: rows[3], name: "Convicted - BPA  " },
            { value: rows[4], name: "Pending - FRR  " },
            { value: rows[5], name: "Pending - WoA  " },
            { value: rows[6], name: "Pending - Remand  " },
            { value: rows[7], name: "Dead  " },
            { value: rows[8], name: "Fined/Comm Service  " },
            { value: rows[9], name: "Escaped  " },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
    hideLoading();
    myChart.setOption(option);
  }, "Ivory");
});

el("rhino-accused-action-btn").addEventListener("click", function () {
  clear();
  showLoading();
  // Get the mysql service
  document.getElementById("heading").innerHTML =
    "Ratio of Accused in Rhino Cases";
  document.getElementById("date").innerHTML =
    getStartString() + " to " + getEndString();

  getCourtCaseStatus(function (rows) {
    createTable1D(rows);
    var option = {
      title: {
        text: "Court Case Status",
        subtext: "Rhino\n" + getStartString() + " to " + getEndString(),
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      toolbox: {
        show: true,
        right: "10%",
        feature: {
          dataView: {
            show: true,
            title: "Data View",
          },
          saveAsImage: {
            show: true,
            title: "Save As Image",
          },
        },
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "Court Case Status",
          type: "pie",
          radius: "50%",
          label: {
            formatter: "{b}: {@2012} ({d}%)",
          },
          data: [
            { value: rows[0], name: "Convicted =/> 9 years  " },
            { value: rows[1], name: "Convicted < 9 years  " },
            { value: rows[2], name: "Acquitted  " },
            { value: rows[3], name: "Convicted - BPA  " },
            { value: rows[4], name: "Pending - FRR  " },
            { value: rows[5], name: "Pending - WoA  " },
            { value: rows[6], name: "Pending - Remand  " },
            { value: rows[7], name: "Dead  " },
            { value: rows[8], name: "Fined/Comm Service  " },
            { value: rows[9], name: "Escaped  " },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
    hideLoading();
    myChart.setOption(option);
  }, "Rhino");
});
