const express = require('express');
const router = express.Router();
const mysql = require('mysql');


router.get('/quotes', function(req, res, next) {

    // Get a query string value for filter
    const nameFilter = req.query.name;

    const connection = mysql.createConnection({
        host: 'ui0tj7jn8pyv9lp6.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'fs90tep3rdjaccwa',
        password: 'gh4z26oobo6ypeyz',
        database: 'gxlp4xlzlf1qen36'
    });

    connection.connect();

    connection.query(`
SELECT q.*, CONCAT(a.firstName, ' ', a.lastName) AS 'fullName', a.sex AS 'gender'
FROM l9_quotes q INNER JOIN
l9_author a ON q.authorId = a.authorId
WHERE a.firstName LIKE '${nameFilter}'
`,
        function(error, results, fields) {
            if (error) throw error;
            console.log('The quotes are: ', results);

            res.render('../public/09lab/views/quotes', {
                title: 'Lab 9',
                quotes: results
            });
        });

    connection.end();

});

module.exports = router;