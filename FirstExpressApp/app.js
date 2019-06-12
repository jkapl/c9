var express = require("express");
var app = express();

app.get("/", function(req,res) {
    res.send("Hi There!");
});

app.get("/bye/:anymoretext", function(req, res) {
    console.log(req.params)
    res.send("Bye!!");
});

app.get("/dog", function(req, res) {
    res.send("MEOW!!");
});

app.get("*", function(req, res) {
    res.send("You are a STAR!!!");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server has started!");
});