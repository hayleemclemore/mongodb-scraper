// var bodyParser = require("body-parser");

// var handlebars = require("express-handlebars");
// var mongoose = require("mongoose");

// // Our scraping tools
// // Axios is a promised-based http library, similar to jQuery's Ajax method
// // It works on the client and on the server
// var axios = require("axios");
// var cheerio = require("cheerio");

var express = require("express");

//Set up port to be either the host's designated port, or 3000
var PORT = process.env.PORT || 3000;

//Initiate Express App
var app = express();

//Set up an Express Router
var router = express.Router();

//Designate our public folder as a static directory
app.use(express.static(_dirname + "/public"));

//Have every request go through our router middleware
app.use(router);

//Listen on the port
app.listen(PORT, function() {
    console.log("Listening on port:" + PORT);
});