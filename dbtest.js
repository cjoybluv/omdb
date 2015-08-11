var db = require('./models');


// db.favorite.create({ imdbid: 'tt01324', title: 'star wars', year: 1973 })
//          .then(function(data) {
//             console.log('<<<  LINK CREATED >>>');
//             // res.redirect('/links/'+data.id);
//   });


// find 1
// db.favorite.find(
//   {
//     where:{title:'star wars'}
//   }).then(function(movie){
//   console.log(movie.get());
// });

// find all
// db.favorite.findAll().then(function(favorites){
//   // console.log(favorites.length);
//   favorites.forEach(function(favorite){
//     console.log(favorite.get());
//     console.log('-----------');
//   });
// });


// //find 1 author - make a post
// db.author.find(
//   {where:{name:'Sara'} })
// .then(function(author){
//   author.createPost({
//     title:'Third Post',
//     content:'Third post content'
//   }).then(function(post){
//     console.log(post.get());
//   });
//   console.log(author.get());
// });



// //find 1 author - get posts
// db.author.find(
//   {where:{name:'Dave'} })
// .then(function(author){
//   console.log(author.get());
//   author.getPosts().then(function(posts){
//     console.log('post count',posts.length);
//     posts.forEach(function(post){
//       console.log('------');
//       console.log(post.get());
//     });
//   });
// });




// // find all - get posts
// db.author.findAll().then(function(authors){
//   // console.log(authors.length);
//   authors.forEach(function(author){
//     author.getPosts().then(function(post){
//       console.log(author.get());
//       console.log('post count',post.length);
//       console.log('-----------');
//     });
//   });
//   console.log('all done??');
// });



// // find all - get posts
// db.author.findAll({
//   include:[db.post]
// }).then(function(authors){
//   // console.log(authors.length);
//   authors.forEach(function(author){
//     var cleanAuthor = author.get();
//     cleanAuthor.posts = cleanAuthor.posts.map(function(post){
//       return post.get();
//     });
//     console.log(cleanAuthor);
//   });
//   console.log('all done??');
// });


