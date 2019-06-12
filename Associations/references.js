var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog_demo_2', { useNewUrlParser: true});

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
    posts: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Post'
      }    
    ]
});

//model
var User = mongoose.model('User', userSchema);

// Post.create({
//     title: 'How to cook the best burger pt. 3',
//     content: 'kajsdhfksdjfhaksljdfhadskljfh'
// }, function(err, post) {
//     User.findOne({email: 'bob@gmail.com'}, function(err, foundUser) {
//         if (err) {
//             console.log('error')
//         } else {
//             foundUser.posts.push(post);
//             foundUser.save(function(err, data) {
//                 if (err) {
//                     console.log('error')
//                 } else {
//                     console.log(data);
//                 }
//             })
//         }
//     });
// });

//Find user
//Find all posts for that user

User.findOne({email: 'bob@gmail.com'}).populate('posts').exec(function(err, user) {
    if (err) {
        console.log('error')
    } else {
        console.log(user);
    }
})
