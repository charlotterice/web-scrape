var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = ("cheerio");
var db = require("./models");
var PORT = 3000;
var app = express();


app.use(logger("dev"));

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));

//mongoose.connect("mongodb://localhost/unit18Populater",{useNewUrlParser: true});

app.get("/scrape", function(req,res){
    axios.get("https://www.bbc.com/").then(function(response){
        var $ = cheerio.load(response.data);
        var result =[];
        $("h3.media__title").each(function(i, element){
            result.title = $(this).children("a").text();
            result.summary=$(this).children("").attr();
            result.link = $(this).children("a").attr("href");
            db.Article.create(result).then(function(dbArticle){
            console.log(dbArticle);
            })
            .catch(function(err){
                console.log(err);
            });
        });
        res.send("Scraped!")
    });
});

app.get("/articles"), function(req, res){

}