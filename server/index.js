const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();
const request = require("request-promise");
const { html } = require("cheerio");
app.listen(3000, () => {
  console.log("server is up and running");
});
app.get("/", (req, res) => {
  res.send("Welcome to image scrapper API");
});

var jsonParser = bodyParser.json();
app.post("/urls", jsonParser, (req, res) => {
  console.log(req);
  const body = req.body;
  console.log(body);
  var query = body["query"];
  query = query.trim().replaceAll("", "+");

  var data;
  request({
    uri:
      "https://www.google.com/search?q=" +
      query +
      "&hl=en-US&source=lnms&tbm=isch",
    header: {
      "accept-encoding": "gzip,deflate,br",
      "accept-language": "en-US,en;q=0.9",
    },
    gzip: true,
  })
    .then((html) => {
      //res.send(html);
      data = html;
      $ = cheerio.load(html);
      const allChildren = $("img");
      const resImageList = [];
      allChildren.each((index, image) => {
        console.log($(image).attr("src"));
        resImageList.push($(image).attr("src"));
      });
      res.send(resImageList);
    })
    .catch((err) => console.log("errrrrr" + err));
});
