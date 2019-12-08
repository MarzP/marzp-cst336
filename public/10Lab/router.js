const express = require('express');
const router = express.Router();
const mysql = require('mysql');

router.get("/", async function(req, res, next){
    const selectAllSql = `
SELECT q.*, CONCAT(a.firstName, ' ', a.lastName) AS 'fullName', a.sex AS 'gender'
FROM l9_quotes q INNER JOIN
l9_author a ON q.authorId = a.authorId
`;

    const connection = mysql.createConnection({
        host: 'olxl65dqfuqr6s4y.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'lhgmlbcss59s9m0p',
        password: 'vrf2lrmgmpwe02g5',
        database: 'id9he8k3oeqj35ei'
    });

    connection.connect();

    connection.query(selectAllSql,
        function(error, results, fields) {
            if (error) throw error;
            // console.log('The quotes are: ', results);

            res.render("../public/10Lab/views/index", {
                title: 'Lab 10 Quotes',
                quotes: results
            });
        });

    connection.end();
    
    
});//root

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
        host: 'p2d0untihotgr5f6.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'zsn9kncqtvumywkk',
        password: 'jrj24hhp4uchfj03',
        database: 'pvfhxur2aptwj0sr'
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

module.exports = router;