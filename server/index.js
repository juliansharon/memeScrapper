const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");
const app = express();
const request = require("request-promise");
const { html } = require("cheerio");
app.listen(3000, () => {
  console.log("server is up and running");
});
app.get("/", (req, res) => {
  res.send("hi");
});
app.get("/meme", (req, res) => {
  var data;
  request({
    uri: "https://www.google.com/search?q=meme+templates&hl=en-US&source=lnms&tbm=isch",
    header: {
      "accept-encoding": "gzip,deflate,br",
      "accept-language": "en-US,en;q=0.9",
    },
    gzip: true,
  })
    .then((html) => {
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

async function scrapper() {}

function getPropertyString(obj) {
  var res = "";
  var stack = [];
  var objectHistory = []; // added this
  stack.push(obj);
  while (stack.length > 0) {
    var object = stack.pop();
    if (objectHistory.indexOf(object) != -1) continue; // added this
    objectHistory.push(object); // added this
    res += "[";
    for (var prop in object) {
      if (prop == null) continue;
      if (typeof object[prop] === "object") {
        stack.push(object[prop]);
      } else {
        res +=
          prop + ": " + object[prop].toString().replace(/[\t\r\n]/g, "") + ", ";
      }
    }
    res += "],";
  }
  return res;
}
