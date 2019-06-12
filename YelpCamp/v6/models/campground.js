var mongoose = require('mongoose');

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Comment'
      }
    ]
});

//compiling schema into a model - turn schema into useable code with methods like .find() and .create()
var Campground = mongoose.model('Campground', campgroundSchema);

//returns the model when this file is required in app.js (require(./models/campground.js))
module.exports = mongoose.model('Campground', campgroundSchema);