var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog_demo', { useNewUrlParser: true});

//POST - title, content
//schema
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

//model
var Post = mongoose.model('Post', postSchema);

// USER - email, name
//schema
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

//model
var User = mongoose.model('User', userSchema);


// var newUser = new User({
//     email: 'hermoine@hogwarts.edu',
//     name: 'Hermoine Grainger'
// });

// newUser.posts.push({
//     title: 'How to brew polyjuice potion',
//     content: 'Go to potions class!'
// })

// newUser.save(function (err, user) {
//     if (err) {
//         console.log('error');
//     } else {
//         console.log(user);
//     }
// });

// var newPost = new Post ({
//     title: 'Reflections on Apples',
//     content: 'They are delicious'
// });

// newPost.save(function(err, post) {
//     if  (err) {
//         console.log('error');
//     } else {
//         console.log(post);
//     }
// });

User.findOne({name: 'Hermoine Grainger'}, function(err, user) {
    if (err) {
        console.log('error');
    } else {
        user.posts.push({
            title: '3 things I really hate',
            content: 'Voldemort, Voldemort, Voldemort'
        })
        user.save(function (err, user) {
            if (err) {
                console.log('error');
            }else {
                console.log(user);
            }
        });
    }
});