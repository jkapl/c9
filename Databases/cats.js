var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cat_app', { useNewUrlParser: true});

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model('Cat', catSchema);

//adding a new cat to the database

// var george = new Cat({
//     name: 'Mrs. Norris',
//     age: 7,
//     temperament: 'Evil'
// })

// george.save(function (err, cat) {
//     if (err) {
//         console.log('something went wrong');
//     } else {
//         console.log('we just saved a cat to the DB:');
//         console.log(cat);
//     }
// });

//retrieve all cats from the DB and console.log each one

Cat.find({}, function (err, cat) {
    if (err) {
        console.log(err);
    } else {
        console.log('cats below!');
        console.log(cat);
    }
})