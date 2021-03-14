var express = require("express");
var app = express();

// By default, the "/" route will be served from "public" folder
app.use(express.static("public"));

// Anything starting with "/node_modules" gets served from "/node_modules" instead
app.use("/node_modules", express.static(__dirname + "/node_modules"));

// Serve our static web content on port 5000
var server = app.listen(3155);
