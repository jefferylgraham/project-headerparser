// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

//API endpoint for parsing
app.use("/api/whoami", function(req, res, next) {
  //parse ip address from x-forwarded-for header
  var ip = req.header("x-forwarded-for") || req.connection.remoteAddress;
  var ips = ip.split(",");
  var ipAddress = ips[0];

  //get langauge from Accept-Language header
  var languages = req.header("Accept-Language");

  //get user info from User-Agent header
  var software = req.header("User-Agent");

  return res.json({
    ipaddress: ipAddress,
    language: languages,
    software: software
  });
  next();
});

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

// listen for requests :)
var listener = app.listen(3000, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
