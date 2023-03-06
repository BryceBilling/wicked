var echarts = require("echarts");

el("line-action-btn").addEventListener("click", function () {
  clear();
  showLoading();
  document.getElementById("heading").innerHTML = "Conviction Challenge Trends";
  document.getElementById("date").innerHTML =
    getStart().getFullYear() + " to " + getEnd().getFullYear();
  // Get the mysql service
  getConvictionChallengeTrends(function (rows) {
    createTable(rows);

    var option = {
      title: {
        text: "Conviction Challenge Trends",
        subtext: getStartString() + " to " + getEndString(),
        left: "center",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: [
          "Bail Pending Appeal",
          "Further Remand Refused",
          "Warrant of Arrest",
        ],
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
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: rows[0],
      },
      yAxis: { type: "value" },
      series: [
        {
          name: "Convicted but Bail awarded Pending Appeal  ",
          type: "line",
          stack: "Total",
          data: rows[1],
        },
        {
          name: "Not Concluded due to Further Remand Refused  ",
          type: "line",
          stack: "Total",
          data: rows[3],
        },
        {
          name: "Not Concluded due to Warrant of Arrest  ",
          type: "line",
          stack: "Total",
          data: rows[2],
        },
      ],
    };
    hideLoading();
    // Display the chart using the configuration items and data just specified.
    myChart.setOption(option);
  });
});
