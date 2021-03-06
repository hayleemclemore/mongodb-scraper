// bring in our scrape script and makeDate screipts
var scrape = require("../scripts/scrape");
var makeDate = require("../scripts/date");

var Headline = require("../models/Headline");

module.exports = {
    fetch: function(cb) {
        scrape(function(data) {
            console.log("data:", data)
            var articles = data;
            for (var i=0; i < articles.length; i++) {
                articles[i].date = makeDate();
                articles[i].saved = false;
            }
            // console.log(articles);
            
            Headline.collection.insertMany(articles, {ordered:false}, function(err, docs){
                cb(err, docs);
            });
        });
    },
    delete: function(query, cb) {
        Headline.remove(query, cb);
    },
    get: function(query, cb) {
        if (query.saved && query.saved === "false"){
            query.saved = false
        }
        if (query.saved && query.saved === "true"){
            query.saved = true
        }
        Headline.find(query)
        .sort({
            _id: -1
        })
        .exec(function(err, doc) {
            
            cb(doc);
        });
    },
    update: function(query, cb) {
        console.log();
        
        Headline.update({_id: query._id}, {
            $set: query
        }, {}, cb);
    }
}