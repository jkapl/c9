var express = require('express');
var app = express(); 
var bodyParser = require('body-parser');

var campgrounds = [
      {name : 'Salmon Creek', image : 'https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg'},
      {name : 'Granite Hill', image : 'https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg'},
      {name : 'Mountain Goat\'s Rest', image : 'https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg'}
    ]

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('landing.ejs');
});

app.get('/campgrounds', function (req, res) {
    res.render('campgrounds', {campgrounds:campgrounds}); 
});

app.get('/campgrounds/new', function (req, res) {
    res.render("form.ejs")
}) 

app.post('/campgrounds', function (req, res) {
    var campName = req.body.name;
    var imgUrl = req.body.image;
    campgrounds.push({name: campName, image: imgUrl});
    res.redirect('/campgrounds');
})

app.listen(process.env.PORT, process.env.IP, function () {
    console.log('YelpCamp server has started');
});

 