const express = require('express');
const router = express.Router();
const mysql = require('mysql');

//Dashboard Page
router.get("/", async function(req, res, next){
    let timeSlots = await getTimeSlots();
    //let insertTS = await insertTimeSlot();
    //res.render("../public/Final/views/index", {"timeSlots":timeSlots}, {"insertTS":insertTS});
    res.render("../public/Final/views/index", {"timeSlots":timeSlots});
    
});//index

//Add Time Slot Page
router.get("/addTime", async function(req, res, next) {
    res.render("../public/Final/views/addTime");
});//addTime

//rubric
router.get("/rubric", async function(req, res, next) {
    res.render("../public/Final/rubric");
});

//login page
//Remove Time Slot Page

function getTimeSlots(query) {
    let conn = dbConnection();
    
    return new Promise(function(resolve, reject) {
        conn.connect(function(err) {
            if(err) throw err;
            
            console.log("in database");
            let sql=`SELECT dateOfSlot, startTime, endTime, bookedByFirstName, bookedByLastName FROM final_timeslots`;
            conn.query(sql, function(err,rows,fields) {
                if(err) throw err;
                conn.end();
                resolve(rows);
            });
        });//conn
    });//promise
}//getTimeSlots

function insertTimeSlot(dateOfSlot, startTime, endTime) {
    let conn = dbConnection();
    
    return new Promise(function(resolve, reject) {
        conn.connect(async function(err) {
            if(err) throw err;
            
            let sql = `INSERT INTO \`final_timeslots\`
                      (dateOfSlot, startTime, endTime, firstName, lastName)
                      VALUES (?,?,?,?,?)
                      `;
                      
            let params = [dateOfSlot, startTime, endTime, "Not", "Booked"];
            
            conn.query(sql, params, function(err, rows, fields) {
                if(err) throw err;
                conn.end();
                resolve(rows);
            });
        });//connect
    });//promise
}//insertTimeSlot

function convertTime(time) {
        time = time.split(':'); // convert to array

        // fetch
        var hours = Number(time[0]);
        var minutes = Number(time[1]);
        var seconds = Number(time[2]);

        // calculate
        var timeValue;

        if (hours > 0 && hours <= 12) {
            timeValue = "" + hours;
        } else if (hours > 12) {
            timeValue = "" + (hours - 12);
        } else if (hours == 0) {
            timeValue = "12";
        }

        timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
        timeValue += (seconds < 10) ? ":0" + seconds : ":" + seconds;  // get seconds
        timeValue += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM

        return timeValue;
    }//convertTime





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