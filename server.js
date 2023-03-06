const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
const fs = require("fs");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const assetsRouter = require("./server/assets-router");
const bcryptGen = require("./server/bcrypt-gen");
//const googleAuth = require("./server/google-authorization");
require("dotenv").config();

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PWD,
  database: process.env.MYSQL_DB,
});

app.use(cors());

app.use(express.json());
app.use(express.urlencoded());

app.use("/", express.static(path.join(__dirname, "public"))); //For development
//app.use("/", express.static(path.join(__dirname, "dist"))); //For production
app.use("/src", assetsRouter);

// Set up passport local strategy for authentication
passport.use(
  new LocalStrategy(async (username, password, done) => {
    const sql = `SELECT * FROM users WHERE username = '${username}'`;
    pool.query(sql, async (err, rows) => {
      if (err) {
        done(err);
      } else {
        if (!rows.length) {
          done(null, false, { message: "Incorrect username." });
        } else {
          const user = rows[0];
          const passwordMatch = await bcrypt.compare(password, user.Password);
          if (!passwordMatch) {
            console.log("Test");
            done(null, false, { message: "Incorrect password." });
          }
          done(null, user);
        }
      }
    });
  })
);

// Set up passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set up passport serialization and deserialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const sql = `SELECT * FROM users WHERE id = ${id}`;
  pool.query(sql, (err, rows) => {
    if (err) {
      done(err);
    } else {
      if (!rows.length) {
        done(new Error(`User with ID ${id} not found.`));
      } else {
        const user = rows[0];
        done(null, user);
      }
    }
  });
});

app.get("/api/v1", (req, res) => {
  res.json({
    project: "WICKED",
  });
});

app.get("/api/checkAuth", (req, res) => {
  console.log("Checking");
  if (req.isAuthenticated()) {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
});

app.get("/api/all-crimes-count", (req, res) => {
  const sql = `select count(*) as total from crimes`;
  pool.query(sql, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });
});

app.get("/api/all-exhibits-count", (req, res) => {
  const sql = `select count(*) as total from exhibit`;
  pool.query(sql, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });
});

app.get("/api/all-crimes", (req, res) => {
  const sql = `select distinct(THF_Reference), Date, CR_Number,DR_Number,RRB_Number,Station,Other_Personnel,Anomily, 
  Province, International, Image, Crime_Type, THF_Case_Flag, MAPP_Case_Flag,Zambesi_Society_Case_Flag,DAPU_Case_Flag,MFFU_Case_Flag, 
  Exhibit_Details,Qnty,Weight,Location,Investigation_Officer,Investigation_Officer_Cell 
  from crimes_reference_view order by THF_Reference desc`;

  pool.query(sql, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });
});

app.post("/api/all-crimes-reference", (req, res) => {
  const sql = `select id, distinct(THF_Reference), Date, CR_Number,DR_Number,RRB_Number,Station,Other_Personnel,Anomily, 
  Province, International, Image, Crime_Type, THF_Case_Flag, MAPP_Case_Flag,Zambesi_Society_Case_Flag,DAPU_Case_Flag,MFFU_Case_Flag, 
  Exhibit_Details,Qnty,Weight,Location,Investigation_Officer,Investigation_Officer_Cell 
  from crimes_reference_view where THF_Reference IS NOT NULL and id IS NOT NULL`;

  pool.query(sql, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });
});

// Login route
app.post("/api/login-user", passport.authenticate("local"), (req, res) => {
  res.json({ message: "Login successful." });
});

app.get("/api/all-people", (req, res) => {
  const sql = `select * from crimes_people_view`;

  pool.query(sql, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });
});

app.get("/api/provincial-summary", (req, res) => {
  const sql = `SELECT JSON_OBJECT('province', 'Bulawayo', 'count', Bulawayo) AS json_obj FROM provincial_summary
    UNION ALL
    SELECT JSON_OBJECT('province', 'Harare', 'count', Harare) FROM provincial_summary
    UNION ALL
    SELECT JSON_OBJECT('province', 'Masvingo', 'count', Masvingo) FROM provincial_summary
    UNION ALL
    SELECT JSON_OBJECT('province', 'Midlands', 'count', Midlands) FROM provincial_summary
    UNION ALL
    SELECT JSON_OBJECT('province', 'Mashonaland East', 'count', \`Mashonaland East\`) FROM provincial_summary
    UNION ALL
    SELECT JSON_OBJECT('province', 'Mashonaland West', 'count', \`Mashonaland West\`) FROM provincial_summary
    UNION ALL
    SELECT JSON_OBJECT('province', 'Manicaland', 'count', Manicaland) FROM provincial_summary
    UNION ALL
    SELECT JSON_OBJECT('province', 'Mashonaland Central', 'count', \`Mashonaland Central\`) FROM provincial_summary
    UNION ALL
    SELECT JSON_OBJECT('province', 'Matabeleland North', 'count', \`Matabeleland North\`) FROM provincial_summary
    UNION ALL
    SELECT JSON_OBJECT('province', 'Matabeleland South', 'count', \`Matabeleland South\`) FROM provincial_summary`;

  pool.query(sql, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      const jsonArray = rows.map((result) => result.json_obj);
      res.send(jsonArray);
    }
  });
});

app.get("/api/provincial-max-value", (req, res) => {
  const sql =
    "SELECT GREATEST(Bulawayo,Harare, Masvingo, Midlands, `Mashonaland East`, `Mashonaland West`, Manicaland, `Mashonaland Central`, `Matabeleland North`, `Matabeleland South`) AS max_count FROM provincial_summary;";
  pool.query(sql, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });
});

app.get("/api/provinces", (req, res) => {
  const sql = `select Province from crimes`;

  pool.query(sql, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });
});

app.get("/api/police-input-accused", (req, res) => {
  const sql = "select * from police_input_accused where inserted = 0";
  pool.query(sql, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });
});

app.patch("/api/police-input-accused/:id", (req, res) => {
  const id = req.params.id;
  const updateFields = req.body;
  const sql = "UPDATE police_input_accused SET ? WHERE id = ?";

  // Execute the SQL query with the update fields and user ID
  pool.query(sql, [updateFields, id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error updating");
    } else {
      res.send("Input Updated");
    }
  });
});

app.delete("/api/police-input-accused/:id", (req, res) => {
  const id = req.params.id;

  connection.query(
    "DELETE FROM `police_input_accused` WHERE `id` = ?",
    [id],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error deleting row");
      } else {
        res.sendStatus(200);
      }
    }
  );
});

app.put("/api/police-input-accused/:id", (req, res) => {
  const id = req.params.id;
  const sqlSelect =
    "SELECT * FROM police_input_accused WHERE id = ? and inserted = 0";
  const sqlInsert = "INSERT INTO people SET ?";
  const sqlDelete =
    "UPDATE police_input_accused SET inserted = true WHERE id = ? ";

  // Execute the SELECT query to get the row with the given ID from table1
  pool.query(sqlSelect, [id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error selecting row");
    } else {
      const row = results[0];

      // Insert the row into table2
      pool.query(sqlInsert, row, (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).send("Error inserting row");
        } else {
          // Update police-input table
          connection.query(sqlDelete, [id], (error, results) => {
            if (error) {
              console.error(error);
              res.status(500).send("Error deleting row");
            } else {
              res.send("Row moved successfully");
            }
          });
        }
      });
    }
  });
});

// Handle DELETE requests to the /api/data/:id endpoint
app.delete("/api/police-input-accused/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM police-input WHERE id = ?";

  // Execute the SQL query with the user ID
  connection.query(sql, [id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error deleting row");
    } else {
      res.send("Row deleted successfully");
    }
  });
});

app.get("/api/stations", (req, res) => {
  const sql = `select Station from crimes`;

  pool.query(sql, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });
});

app.get("/api/all-crimes-exhibits", (req, res) => {
  const sql = `select distinct(THF_Reference), id,Date, CR_Number,DR_Number,RRB_Number,Station,Other_Personnel,Anomily, 
  Province, International, Image, Crime_Type, THF_Case_Flag, MAPP_Case_Flag,Zambesi_Society_Case_Flag,DAPU_Case_Flag,MFFU_Case_Flag, 
  Exhibit_Details,Qnty,Weight,Location,Investigation_Officer,Investigation_Officer_Cell 
  from crimes_exhibit_view`;

  pool.query(sql, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });
});

app.post("/api/crimes-accused", (req, res) => {
  const sql = `select * from crimes_people_view where THF_Reference = '${req.body.reference}'`;
  pool.query(sql, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });
});

app.get("/*", (_req, res) => {
  const finalPath = path.join(__dirname, ".", "index.html");
  res.sendFile(finalPath);
});

const { PORT = 3002 } = process.env;

app.listen(PORT, () => {
  console.log();
  console.log(`  App running in port ${PORT}`);
  console.log();
  console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
});
