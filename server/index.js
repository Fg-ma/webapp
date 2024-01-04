require('dotenv').config();
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

app.get("/individuals", (req, res) => {
    db.query("SELECT * FROM individuals;", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/groups", (req, res) => {
    db.query("SELECT * FROM `groups`;", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/organizations", (req, res) => {
    db.query("SELECT * FROM organizations;", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/sheets", (req, res) => {
    db.query("SELECT * FROM sheets;", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/sheet/:sheet_id", (req, res) => {
    const sheet_id = req.params.sheet_id;
    db.query("SELECT * FROM sheets WHERE sheet_id = ?", sheet_id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.get("/individual/:individual_id", (req, res) => {
    const individual_id = req.params.individual_id;
    db.query("SELECT * FROM individuals WHERE individual_id = ?", individual_id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.get("/references/:individual_id", (req, res) => {
    const individual_id = req.params.individual_id;
    db.query("SELECT * FROM individuals_references WHERE individual_id = ?", individual_id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.get("/individuals_sheets/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM individuals_sheets WHERE individual_id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.get("/individuals_videos/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM individuals_videos WHERE individual_id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.get("/video/:video_id", (req, res) => {
    const video_id = req.params.video_id;
    db.query("SELECT * FROM videos WHERE sheet_id = ?", video_id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.listen(5042, () => {
  console.log("Server running on port 5042");
});

//app.post("/create", (req, res) => {
//    const name = req.body.name;
//    const age = req.body.age;
//    const country = req.body.country;
//    const position = req.body.position;
//    const wage = req.body.wage;
//
//    db.query(
//        "INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
//        [name, age, country, position, wage],
//        (err, result) => {
//            if (err) {
//                console.log(err);
//            } else {
//                res.send("Values Inserted");
//            }
//        }
//    );
//});

//app.put("/update", (req, res) => {
//    const id = req.body.id;
//    const wage = req.body.wage;
//    db.query(
//        "UPDATE employees SET wage = ? WHERE id = ?",
//        [wage, id],
//        (err, result) => {
//            if (err) {
//                console.log(err);
//            } else {
//                res.send(result);
//            }
//        }
//    );
//});

//app.delete("/delete/:id", (req, res) => {
//    const id = req.params.id;
//    db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
//        if (err) {
//            console.log(err);
//        } else {
//            res.send(result);
//        }
//    });
//});