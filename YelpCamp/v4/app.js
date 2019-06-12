var express     = require('express'),
    app         = express(), 
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    Campground  = require('./models/campground'),
    Comment     = require('./models/comment'),
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
            res.render('campgrounds/index', {campgrounds:allCampgrounds});
        }
    })
    //res.render('campgrounds', {campgrounds:campgrounds}); 
});

//NEW - show form to create new campground
app.get('/campgrounds/new', function (req, res) {
    res.render("campgrounds/new")
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
           res.render('campgrounds/show', {campground: foundCampground});
       }
    });
});

// COMMENTS ROUTES

app.get('/campgrounds/:id/comments/new', function (req, res) {
    //find campground by id
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log('error')
        } else {
            res.render('comments/new', {campground: campground});
        }
    })
    
})

app.post('/campgrounds/:id/comments', function (req, res) {
    //lookup campground using ID
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            //create comment with form output from campground/new form in req.body.comment
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err)
                } else {
                    
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    })
})


app.listen(process.env.PORT, process.env.IP, function () {
    console.log('YelpCamp server has started');
});

 