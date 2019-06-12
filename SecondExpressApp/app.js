var express = require("express");
var app = express();

app.get('/', function(req, res) {
    res.send("Hi there, welcome to my assignment!");
});

app.get('/speak/:animalname', function(req, res) {
  //console.log(req.params.animalname);
  var expr = req.params.animalname;
  switch (expr) {
      case 'pig':
          res.send("The pig says 'oink'");
          break;
      case 'cow':
          res.send("The cow says 'moo'");
          break;
      case 'dog':
          res.send("The dog says 'woof woof'");
          break;
  }
});

app.get('/repeat/:greet/:num', function(req, res) {
   var greet = req.params.greet;
   var num = parseInt(req.params.num);
   var response = '';
   for (var i=0; i<num; i++) {
       response = response + greet + " ";
   }
   res.send(response);
})

app.get('*', function(req, res) {
    res.send("Sorry, page not found...What are you doing with your life?")
})

app.listen(process.env.PORT, process.env.IP, function() {
    //console.log("server has started!");
});