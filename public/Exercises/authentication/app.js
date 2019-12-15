const express = require("express");
const app = express();
const session = require('express-session');
const bcrypt = require('bcrypt');
const mysql = require('mysql');

app.set('view engine', 'ejs');

app.use(session({
    secret: "top secret!",
    resave: true,
    saveUninitialized:true
}));

app.use(express.urlencoded({extended: true})); //to be able to parse POST parameters

//routes
app.get("/", function(req, res) {
    //res.send("Login form will go here!");
    res.render("index");
});

app.post("/", async function(req, res){
    let username = req.body.username;
    let password= req.body.password;
    console.log("username:" + username);
    console.log("password:" + password);
    let hashedPwd = "$2a$10$06ofFgXJ9wysAOzQh0D0..RcDp1w/urY3qhO6VuUJL2c6tzAJPfj6";
    
    let passwordMatch = await checkPassword(password, hashedPwd);
    console.log("passwordMatch: " + passwordMatch);
    
    if(username == 'admin' && passwordMatch) {
        //res.send("Right credentials!");
        req.session.authenticated = true;
        res.render("welcome");
    } else {
        res.render("index", {"loginError":true});
    }
    res.send("This is the root route using POST!");
});


app.get("/myAccount", isAuthenticated, function(req, res) {
    res.render("account");
});

app.get("/logout", function(req, res) {
    req.session.destroy();
    res.redirect("/");
});

function isAuthenticated(req, res, next) {
    if(!req.session.authenticated) {
        res.redirect('/');
    } else {
        next()
    }
}

function checkPassword(password, hashedValue) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(password, hashedValue, function(err, result) {
            console.log("Result: " + result);
            resolve(result);
        });
    });
    
}

//listener
app.listen(8080, "0.0.0.0", function() {
    console.log("Running Express Server...");
});