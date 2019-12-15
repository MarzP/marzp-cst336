const express = require('express');
const router = express.Router();
const mysql = require('mysql');

//Dashboard Page
router.get("/", async function(req, res, next){
    res.render("../public/Final/views/index");
});//index

//Login Page

//Add Time Slot Page

//Remove Time Slot Page

//Building connection to database
function dbConnection() {
    let conn = mysql.createConnection({
        host: "olxl65dqfuqr6s4y.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
        user: "lhgmlbcss59s9m0p",
        password: "vrf2lrmgmpwe02g5",
        database: "id9he8k3oeqj35ei"
    });//createConnection
    return conn;
}//dbConnection

module.exports = router;