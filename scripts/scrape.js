// scrape script

// Require request and cheerio, making our scrapes possible
var request = require("request");
var cheerio = require("cheerio");
var axios = require("axios");


var scrape = function (cb) {
    
    return axios.get("https://www.nytimes.com").then(function(res){
        var $ = cheerio.load(res.data)

        var articles = [];

        $(".assetWrapper").each(function(i, element) {
            console.log(element)
            var head = $(this).find("h2").text().trim();
            var url = $(this).find("a").text().trim();
            var sum = $(this).find("p").text().trim();

            if(head && url && sum)
            var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
            var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

            var dataToAdd = {
                headline: headNeat,
                summary: sumNeat,
                url: "https://www.nytimes.com" + url
            };
            articles.push(dataToAdd)
        });
        cb(articles);
    });

};
module.exports = scrape;