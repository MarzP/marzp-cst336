const express = require('express');
const router = express.Router();
const mysql = require('mysql');

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

router.post('/quotes/add', function(req, res, next) {

    // Get a query string value for filter
    const nameFilter = req.query.name;

    const connection = mysql.createConnection({
        host: 'ui0tj7jn8pyv9lp6.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'fs90tep3rdjaccwa',
        password: 'gh4z26oobo6ypeyz',
        database: 'gxlp4xlzlf1qen36'
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