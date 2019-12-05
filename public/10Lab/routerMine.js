const express = require('express');
const router = express.Router();
const mysql = require('mysql');

router.get('/quotes/add', (req, res) => {

    res.render('../public/10Lab/view', {
        title: 'Lab 10'
    });

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