const express = require("express");
const app = express();
app.engine('html', require('ejs').renderFile);
app.use(express.static("public"));


app.get("/", function(req,res) {
    res.render("index.html");
});

app.get("/mercury", function(req, res) {
    res.send("This will be Mercury web page!");
});

app.get("/venus", function(req, res) {
    res.send("This will be Venus web page!");
});

// //server listener
// app.listen("8081", "0.0.0.0", function() {
//     console.log("Express Server is Running...")
// });

//server listener
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Running Express Server...");
});




