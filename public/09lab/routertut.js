// Host: w29ifufy55ljjmzq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com
// Username: icrhy3geicbf2phb
// Password: c0r6l9d6cz99aoml
// Database: xemupjrbgve6imdc

//Have this running in a bash:
//docker run -p 8081:8080 -e ADMINER_DEFAULT_SERVER=mysql adminer

const express = require("express");
const mysql = require("mysql");
const app = express.Router();

//routes
app.get("/", async function(req, res, next){
    
    let categories = await getCategories();
    //let authors = await getAuthors();
    console.log(categories);
    
    res.render("../public/09lab/views/index", {"categories":categories, 
                                //"authors":authors
        
    });
    
});//root

app.get("/quotes", async function(req, res, next){
    
    let rows = await getQuotes(req.query);
    
    res.render("../public/09lab/views/quotes", {"records":rows});
    
});//quotes

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

// function getAuthors(){
    
//     let conn = dbConnection();
    
//     return new Promise(function(resolve, reject){
//         conn.connect(function(err){
//             if(err) throw err;
//             console.log("Authors Connected!");
            
//             let sql = `SELECT firstName, lastName FROM l9_authors
//                         ORDER BY firstName`;
            
//             conn.query(sql, function(err, rows, fields){
//                 if(err) throw err;
//                 //res.send(rows);
//                 resolve(rows);
//             });
//         });//connect
//     });//promise
// }//getAuthors

app.get("/dbTest", async function(req, res){
    
    let conn = dbConnection();
    
    conn.connect(function(err){
        if(err) throw err;
        console.log("Connected!");
        
        let sql = "SELECT * FROM l9_author WHERE sex = 'F'";
        
        conn.query(sql, function(err, rows, fields){
            if(err) throw err;
            res.send(rows);
        });
    });
    
});//dbTest

function dbConnection(){
    
    let conn = mysql.createConnection({
        host: "olxl65dqfuqr6s4y.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
        user: "lhgmlbcss59s9m0p",
        password: "vrf2lrmgmpwe02g5",
        database: "id9he8k3oeqj35ei"
    });//createConnection
    
    return conn;
}

module.exports = app;