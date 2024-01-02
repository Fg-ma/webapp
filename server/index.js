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