//Require our dependencies
var express = require("express");
var bodyParser = require("body-parser");
var expressHandlebars = require("express-handlebars");
var mongoose = require("mongoose");

// // Our scraping tools
// // Axios is a promised-based http library, similar to jQuery's Ajax method
// // It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

//Set up port to be either the host's designated port, or 3000
var PORT = process.env.PORT || 3001;

//Initiate Express App
var app = express();

//Set up an Express Router
var router = express.Router();

//Require our routes file pass our router object
require("./config/routes")(router);

//Designate our public folder as a static directory
app.use(express.static(__dirname + "/public"));


//connect Handlebars to our Express app
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//use bodyParser in our app
app.use(bodyParser.urlencoded({
    extended: false
}));

//Have every request go through our router middleware
app.use(router);

//If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadLines";

//Connect mongoose to our database
mongoose.connect(db, function(error) {
    if (error) {
        console.log(error);
    }
    else {
        console.log("mongoose connection is successful");
    }
})

//Listen on the port
app.listen(PORT, function() {
    console.log("Listening on port:" + PORT);
});