var mysql = require("mysql");
const startDate = picker.getStartDate();
const endDate = picker.getEndDate();

function el(selector) {
  return document.getElementById(selector);
}

function getConvictionChallengeTrends(callback) {
  var mysql = require("mysql");
  var woa = [];
  var frr = [];
  var bpa = [];
  var year = [];
  // Add the credentials to access your database
  var connection = mysql.createConnection({
    host: "wicked-db.cl5ikjnirnoq.eu-west-2.rds.amazonaws.com",
    port: "3306",
    user: "admin",
    password: "Database2020",
    database: "thfcrimedatabase",
  });

  // connect to mysql
  connection.connect(function (err) {
    // in case of error
    if (err) {
      console.log(err.code);
      console.log(err.fatal);
    } else {
      console.log("Done");
    }
  });

  // Perform a query

  var endYear = getEnd().getFullYear();
  var startYear = getStart().getFullYear();

  for (let index = startYear; index < endYear + 1; index++) {
    $query =
      "SELECT COUNT(Outcome_Summary) as count FROM thfcrimedatabase.crimes_view where Outcome_Summary like 'Warrant of Arrest' and (Date >= '" +
      index +
      "-01-01' and Date <= '" +
      index +
      "-12-31');";

    connection.query($query, function (err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
      }
      woa.push(rows[0].count);
    });

    $query =
      "SELECT COUNT(Outcome_Summary) as count FROM thfcrimedatabase.crimes_view where Outcome_Summary like 'Further Remand Refused' and (Date >= '" +
      index +
      "-01-01' and Date <= '" +
      index +
      "-12-31');";

    connection.query($query, function (err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
      }
      frr.push(rows[0].count);
    });

    $query =
      "SELECT COUNT(Outcome_Summary) as count FROM thfcrimedatabase.crimes_view where Outcome_Summary like 'Bail Pending Appeal' and (Date >= '" +
      index +
      "-01-01' and Date <= '" +
      index +
      "-12-31');";

    connection.query($query, function (err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
      }
      bpa.push(rows[0].count);
    });
    year.push(index + "");

    // Close the connection
  }

  connection.end(function () {
    callback([year, bpa, woa, frr]);
  });
}

function getCourtCaseStatus(callback, specific) {
  var mysql = require("mysql");
  var cgnine = 0;
  var clnine = 0;
  var acq = 0;
  var bpa = 0;
  var frr = 0;
  var woa = 0;
  var remand = 0;
  var dead = 0;
  var fined = 0;
  var escaped = 0;
  // Add the credentials to access your database
  var connection = mysql.createConnection({
    host: "wicked-db.cl5ikjnirnoq.eu-west-2.rds.amazonaws.com",
    port: "3306",
    user: "admin",
    password: "Database2020",
    database: "thfcrimedatabase",
  });

  // connect to mysql
  connection.connect(function (err) {
    // in case of error
    if (err) {
      console.log(err.code);
      console.log(err.fatal);
    } else {
      console.log("Done");
    }
  });

  // Perform a query

  $query =
    "SELECT COUNT(Outcome_Summary) as count FROM thfcrimedatabase.crimes_view where Outcome_Summary like 'Warrant of Arrest' and (Date >= '" +
    getStartString() +
    "' and Date <= '" +
    getEndString() +
    "')";
  if (specific !== "none") {
    $query += "and Crime_Type like '%" + specific + "%'";
  }
  $query += ";";

  connection.query($query, function (err, rows, fields) {
    if (err) {
      console.log("An error ocurred performing the query.");
      console.log(err);
      return;
    }
    woa = rows[0].count;
    console.log("Query succesfully executed");
  });

  $query =
    "SELECT COUNT(Outcome_Summary) as count FROM thfcrimedatabase.crimes_view where lower(Outcome_Summary) like '%Further Remand Refused%' and (Date >= '" +
    getStartString() +
    "' and Date <= '" +
    getEndString() +
    "')";
  if (specific !== "none") {
    $query += "and Crime_Type like '%" + specific + "%'";
  }
  $query += ";";

  connection.query($query, function (err, rows, fields) {
    if (err) {
      console.log("An error ocurred performing the query.");
      console.log(err);
      return;
    }
    frr = rows[0].count;
  });

  $query =
    "SELECT COUNT(Outcome_Summary) as count FROM thfcrimedatabase.crimes_view where lower(Outcome_Summary) like '%bail pending appeal%' and (Date >= '" +
    getStartString() +
    "' and Date <= '" +
    getEndString() +
    "')";
  if (specific !== "none") {
    $query += "and Crime_Type like '%" + specific + "%'";
  }
  $query += ";";

  connection.query($query, function (err, rows, fields) {
    if (err) {
      console.log("An error ocurred performing the query.");
      console.log(err);
      return;
    }
    bpa = rows[0].count;
  });

  $query =
    "SELECT COUNT(Outcome_Summary) as count FROM thfcrimedatabase.crimes_view where lower(Outcome_Summary) like '%acquitted%' and (Date >= '" +
    getStartString() +
    "' and Date <= '" +
    getEndString() +
    "')";
  if (specific !== "none") {
    $query += "and Crime_Type like '%" + specific + "%'";
  }
  $query += ";";

  connection.query($query, function (err, rows, fields) {
    if (err) {
      console.log("An error ocurred performing the query.");
      console.log(err);
      return;
    }
    acq = rows[0].count;
  });

  $query =
    "SELECT COUNT(Outcome_Summary) as count FROM thfcrimedatabase.crimes_view where lower(Outcome_Summary) like '%remanded%' and (Date >= '" +
    getStartString() +
    "' and Date <= '" +
    getEndString() +
    "')";
  if (specific !== "none") {
    $query += "and Crime_Type like '%" + specific + "%'";
  }
  $query += ";";
  console.log($query);

  connection.query($query, function (err, rows, fields) {
    if (err) {
      console.log("An error ocurred performing the query.");
      console.log(err);
      return;
    }
    remand = rows[0].count;
  });

  $query =
    "SELECT COUNT(Outcome_Summary) as count FROM thfcrimedatabase.crimes_view where lower(Outcome_Summary) like '%dead%' and (Date >= '" +
    getStartString() +
    "' and Date <= '" +
    getEndString() +
    "')";
  if (specific !== "none") {
    $query += "and Crime_Type like '%" + specific + "%'";
  }
  $query += ";";

  connection.query($query, function (err, rows, fields) {
    if (err) {
      console.log("An error ocurred performing the query.");
      console.log(err);
      return;
    }
    dead = rows[0].count;
  });

  $query =
    "SELECT COUNT(Outcome_Summary) as count FROM thfcrimedatabase.crimes_view where lower(Outcome_Summary) like '%fined and/or community service%' and (Date >= '" +
    getStartString() +
    "' and Date <= '" +
    getEndString() +
    "')";
  if (specific !== "none") {
    $query += "and Crime_Type like '%" + specific + "%'";
  }
  $query += ";";

  connection.query($query, function (err, rows, fields) {
    if (err) {
      console.log("An error ocurred performing the query.");
      console.log(err);
      return;
    }
    fined = rows[0].count;
  });

  $query =
    "SELECT COUNT(Outcome_Summary) as count FROM thfcrimedatabase.crimes_view where lower(Outcome_Summary) like '%escaped%' and (Date >= '" +
    getStartString() +
    "' and Date <= '" +
    getEndString() +
    "')";
  if (specific !== "none") {
    $query += "and Crime_Type like '%" + specific + "%'";
  }
  $query += ";";

  connection.query($query, function (err, rows, fields) {
    if (err) {
      console.log("An error ocurred performing the query.");
      console.log(err);
      return;
    }
    escaped = rows[0].count;
  });

  $query =
    "SELECT COUNT(Outcome_Summary) as count FROM thfcrimedatabase.crimes_view where lower(Outcome_Summary) like '%convicted%' and Convicted_Length < '9' and (Date >= '" +
    getStartString() +
    "' and Date <= '" +
    getEndString() +
    "')";
  if (specific !== "none") {
    $query += "and Crime_Type like '%" + specific + "%'";
  }
  $query += ";";

  connection.query($query, function (err, rows, fields) {
    if (err) {
      console.log("An error ocurred performing the query.");
      console.log(err);
      return;
    }
    cgnine = rows[0].count;
  });

  $query =
    "SELECT COUNT(Outcome_Summary) as count FROM thfcrimedatabase.crimes_view where lower(Outcome_Summary) like '%convicted%' and Convicted_Length >= '9' and (Date >= '" +
    getStartString() +
    "' and Date <= '" +
    getEndString() +
    "')";
  if (specific !== "none") {
    $query += " and Crime_Type like '%" + specific + "%'";
  }
  $query += ";";

  connection.query($query, function (err, rows, fields) {
    if (err) {
      console.log("An error ocurred performing the query.");
      console.log(err);
      return;
    }
    clnine = rows[0].count;
  });

  // Close the connection

  console.log("Query succesfully executed");

  connection.end(function () {
    callback([
      cgnine,
      clnine,
      acq,
      bpa,
      frr,
      woa,
      remand,
      dead,
      fined,
      escaped,
    ]);
  });
}

function getCourtCaseStatusConviction(callback, specific) {
  var mysql = require("mysql");
  var cgnine = 0;
  var clnine = 0;
  var acq = 0;
  var dead = 0;
  var fined = 0;
  // Add the credentials to access your database
  var connection = mysql.createConnection({
    host: "wicked-db.cl5ikjnirnoq.eu-west-2.rds.amazonaws.com",
    port: "3306",
    user: "admin",
    password: "Database2020",
    database: "thfcrimedatabase",
  });

  // connect to mysql
  connection.connect(function (err) {
    // in case of error
    if (err) {
      console.log(err.code);
      console.log(err.fatal);
    } else {
      console.log("Done");
    }
  });

  // Perform a query

  $query =
    "SELECT COUNT(Outcome_Summary) as count FROM thfcrimedatabase.crimes_view where lower(Outcome_Summary) like '%acquitted%' and (Finalisation_Date >= '" +
    getStartString() +
    "' and Finalisation_Date <= '" +
    getEndString() +
    "')";
  if (specific !== "none") {
    $query += "and Crime_Type like '%" + specific + "%'";
  }
  $query += ";";
  connection.query($query, function (err, rows, fields) {
    if (err) {
      console.log("An error ocurred performing the query.");
      console.log(err);
      return;
    }
    acq = rows[0].count;
  });

  $query =
    "SELECT COUNT(Outcome_Summary) as count FROM thfcrimedatabase.crimes_view where lower(Outcome_Summary) like '%dead%' and (Finalisation_Date >= '" +
    getStartString() +
    "' and Finalisation_Date <= '" +
    getEndString() +
    "')";
  if (specific !== "none") {
    $query += "and Crime_Type like '%" + specific + "%'";
  }
  $query += ";";

  connection.query($query, function (err, rows, fields) {
    if (err) {
      console.log("An error ocurred performing the query.");
      console.log(err);
      return;
    }
    dead = rows[0].count;
  });

  $query =
    "SELECT COUNT(Outcome_Summary) as count FROM thfcrimedatabase.crimes_view where lower(Outcome_Summary) like '%fined and/or community service%' and (Date_Convicted >= '" +
    getStartString() +
    "' and Date_Convicted <= '" +
    getEndString() +
    "')";
  if (specific !== "none") {
    $query += "and Crime_Type like '%" + specific + "%'";
  }
  $query += ";";

  connection.query($query, function (err, rows, fields) {
    if (err) {
      console.log("An error ocurred performing the query.");
      console.log(err);
      return;
    }
    fined = rows[0].count;
  });

  $query =
    "SELECT COUNT(Outcome_Summary) as count FROM thfcrimedatabase.crimes_view where lower(Outcome_Summary) like '%convicted%' and Convicted_Length < '9' and (Date_Convicted >= '" +
    getStartString() +
    "' and Date_Convicted <= '" +
    getEndString() +
    "')";
  if (specific !== "none") {
    $query += "and Crime_Type like '%" + specific + "%'";
  }
  $query += ";";

  connection.query($query, function (err, rows, fields) {
    if (err) {
      console.log("An error ocurred performing the query.");
      console.log(err);
      return;
    }
    clnine = rows[0].count;
  });

  $query =
    "SELECT COUNT(Outcome_Summary) as count FROM thfcrimedatabase.crimes_view where lower(Outcome_Summary) like '%convicted%' and Convicted_Length >= '9' and (Date_Convicted >= '" +
    getStartString() +
    "' and Date_Convicted <= '" +
    getEndString() +
    "')";
  if (specific !== "none") {
    $query += " and Crime_Type like '%" + specific + "%'";
  }
  $query += ";";

  connection.query($query, function (err, rows, fields) {
    if (err) {
      console.log("An error ocurred performing the query.");
      console.log(err);
      return;
    }
    cgnine = rows[0].count;
  });

  // Close the connection

  console.log("Query succesfully executed");

  connection.end(function () {
    callback([cgnine, clnine, acq, dead, fined]);
  });
}
