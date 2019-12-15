const express = require('express');
const router = express.Router();
const mysql = require('mysql');

router.get("/", async function(req, res, next){
    res.render("../public/Final/views/index");
});//index

module.exports = router;