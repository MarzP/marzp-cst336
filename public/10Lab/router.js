const express = require('express');
const router = express.Router();
const mysql = require('mysql');

router.get("/", async function(req, res, next){
     let rows = await getQuotes(req.query);
    
    res.render("../public/10Lab/views/index2", {"records":rows});
    
});//quotes

///////
//add//
///////

router.get('/quotes/add', (req, res) => {

    // If this is an edit instead of an add (maybe change the route name from add to edit)
    // you would check to see if a query string value was passed in, then fetch the data from MySQL if it is
    
    if (req.query.id) {
        // Get the data for the ID from the database, then pass into the view with the data
    } else {
        // No query string for a quote to edit so must be new
        res.render('../public/10Lab/views/view', {
            title: 'Lab 10',
            data: {} // No data
        });
    }

});
////////
//edit//
////////

router.get('/quotes/edit', (req, res) => {

    // If this is an edit instead of an add (maybe change the route name from add to edit)
    // you would check to see if a query string value was passed in, then fetch the data from MySQL if it is

    if (req.query.id) {

        const connection = mysql.createConnection({
            host: 'olxl65dqfuqr6s4y.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'lhgmlbcss59s9m0p',
        password: 'vrf2lrmgmpwe02g5',
        database: 'id9he8k3oeqj35ei'
        });

        const selectOneSql = `
SELECT q.*, CONCAT(a.firstName, ' ', a.lastName) AS 'fullName', a.sex AS 'gender'
FROM l9_quotes q INNER JOIN
l9_author a ON q.authorId = a.authorId
WHERE q.quoteId = ?
`;
        // Get the data for the ID from the database, then pass into the view with the data
        connection.connect();

        connection.query(selectOneSql, [req.query.id],
            function(error, results, fields) {

                //console.log('results', results[0]);

                if (error) throw error;

                res.render('../public/10Lab/views/edit', {
                    title: 'Lab 10 Edit Quote',
                    data: results[0]
                });
            });

        connection.end();
    }
    else {
        // No query string for a quote to edit so must be new
        res.render('../public/10Lab/views/edit', {
            title: 'Lab 10 Add Quote',
            data: {} // No data
        });
    }

});

router.post('/quotes/edit', function(req, res, next) {

    const connection = mysql.createConnection({
        host: 'olxl65dqfuqr6s4y.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'lhgmlbcss59s9m0p',
        password: 'vrf2lrmgmpwe02g5',
        database: 'id9he8k3oeqj35ei'
    });

    connection.connect();

    if (req.body.quoteId && req.body.quoteId.length > 0) {
        connection.query(
            'UPDATE l9_quotes SET authorId = ?, quote = ?, category = ? WHERE quoteId = ?', [req.body.authorId, req.body.quote, req.body.category, req.body.quoteId], // assuming POST
            (error, results, fields) => {
                if (error) throw error;
                res.json({
                    id: results.quoteId
                });
            });
    }
    else {
        connection.query(
            'INSERT INTO l9_quotes(authorId, quote, category) VALUES (?, ?, ?)', [req.body.authorId, req.body.quote, req.body.category], // assuming POST
            (error, results, fields) => {
                if (error) throw error;
                res.json({
                    id: results.insertId
                });
            });
    }

    connection.end();

});

//////////
//Delete//
//////////

router.get('/quotes/delete', (req, res) => {

    if (!req.query.id || req.query.id.length === 0) {
        return next(new Error("There is a problem"));
    }
    const connection = mysql.createConnection({
         host: 'olxl65dqfuqr6s4y.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'lhgmlbcss59s9m0p',
        password: 'vrf2lrmgmpwe02g5',
        database: 'id9he8k3oeqj35ei'
    });

    const selectOneSql = `
SELECT q.*, CONCAT(a.firstName, ' ', a.lastName) AS 'fullName', a.sex AS 'gender'
FROM l9_quotes q INNER JOIN
l9_author a ON q.authorId = a.authorId
WHERE q.quoteId = ?
`;
    // Get the data for the ID from the database, then pass into the view with the data
    connection.connect();

    connection.query(selectOneSql, [req.query.id],
        function(error, results, fields) {

            //console.log('results', results[0]);

            if (error) throw error;

            res.render('../public/10Lab/views/delete', {
                title: 'Lab 10 Delete Quote',
                data: results[0]
            });
        });

    connection.end();

});

router.delete('/quotes/delete', function(req, res, next) {

    if (!req.body.quoteId || req.body.quoteId.length === 0) {
        return next(new Error("There is a problem"));
    }
    
    // Add check to see if there are any favorites, and if there are, send
    // back an error message and DO NOT attempt a DELETE

    const connection = mysql.createConnection({
       host: 'olxl65dqfuqr6s4y.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'lhgmlbcss59s9m0p',
        password: 'vrf2lrmgmpwe02g5',
        database: 'id9he8k3oeqj35ei'
    });

    connection.connect();

    connection.query(
        'DELETE FROM l9_quotes WHERE quoteId = ?', [req.body.quoteId], // assuming POST
        (error, results, fields) => {
            if (error) throw error;
            res.json({
                id: results.quoteId
            });
        });

    connection.end();

});



////////////
//Function//
////////////

router.post('/quotes/add', function(req, res, next) {

    // Get a query string value for filter
    const nameFilter = req.query.name;

    const connection = mysql.createConnection({
        host: 'olxl65dqfuqr6s4y.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'lhgmlbcss59s9m0p',
        password: 'vrf2lrmgmpwe02g5',
        database: 'id9he8k3oeqj35ei'
    });

    connection.connect();

    connection.query(
        'INSERT INTO l9_quotes(authorId, quote, category) VALUES (?, ?, ?)', 
        [req.body.authorId, req.body.quote, req.body.category], // assuming POST
        (error, results, fields) => {
            if (error) throw error;
            res.json({
                id: results.insertId
            });
        });

    connection.end();

});

function getQuotes(query){
    
    let keyword = query.keyword;
    let category = query.category;
    let authorfirst = query.authorfirst;
    let authorlast = query.authorlast;
    let gender = query.gender;
    let conn = dbConnection();
    
    return new Promise(function(resolve, reject){
        conn.connect(function(err){
            if(err) throw err;
            console.log("Connected!");
            
            let sql = `SELECT quote, firstName, lastName, category, sex FROM l9_quotes
                        NATURAL JOIN l9_author
                        WHERE
                        quote LIKE '%${keyword}%'`;
                        
            if (category){ //if the user selected a quote category
                
                sql += ` AND category = '${category}'`;
            }
            if (authorfirst){
                
                sql += ` AND firstName LIKE '%${authorfirst}%'`;
            }
            if (authorlast){
                
                sql += ` AND lastName LIKE '%${authorlast}%'`;
            }
            if (gender){
                
                sql += ` AND sex = '${gender}'`;
            }
            
            conn.query(sql, function(err, rows, fields){
                if(err) throw err;
                //res.send(rows);
                resolve(rows);
            });
        });//connect
    });//promise
}//getQuotes

function dbConnection(){
    
    let conn = mysql.createConnection({
        host: "olxl65dqfuqr6s4y.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
        user: "lhgmlbcss59s9m0p",
        password: "vrf2lrmgmpwe02g5",
        database: "id9he8k3oeqj35ei"
    });//createConnection
    
    return conn;
}

function getCategories(){
    
    let conn = dbConnection();
    
    return new Promise(function(resolve, reject){
        conn.connect(function(err){
            if(err) throw err;
            console.log("Categories Connected!");
            
            let sql = `SELECT DISTINCT category FROM l9_quotes
                        ORDER BY category`;
            
            conn.query(sql, function(err, rows, fields){
                if(err) throw err;
                //res.send(rows);
                resolve(rows);
            });
        });//connect
    });//promise
}//getCategories

module.exports = router;