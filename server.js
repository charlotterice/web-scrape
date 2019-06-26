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
        $("article h3").each(function(i, element){
            var result ={};
            result.title = $(this).children("a").text();
            result.link = $(this).children("a").attr("href");
        })
    })
})