var express     = require('express'),
    app         = express(), 
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    Campground  = require('./models/campground'),
    seedDB      = require('./seeds')


mongoose.connect('mongodb://localhost/yelp_camp', { useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
seedDB();

app.get('/', function (req, res) {
    res.render('landing.ejs');
});

//INDEX route
app.get('/campgrounds', function (req, res) {
    //Get all campgrounds from DB
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log('error');
        } else {
            res.render('index', {campgrounds:allCampgrounds});
        }
    })
    //res.render('campgrounds', {campgrounds:campgrounds}); 
});

//NEW - show form to create new campground
app.get('/campgrounds/new', function (req, res) {
    res.render("form.ejs")
}) 

//CREATE route
app.post('/campgrounds', function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
    //Create a new campground and save to DB
    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            //redirect back to campgrounds
            res.redirect('/campgrounds');
        }
    })
})

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function (req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate('comments').exec(function (err, foundCampground) {
       if (err) {
           console.log(err);
       } else {
           console.log(foundCampground);
           res.render('show', {campground: foundCampground});
       }
    });
});

app.listen(process.env.PORT, process.env.IP, function () {
    console.log('YelpCamp server has started');
});

 