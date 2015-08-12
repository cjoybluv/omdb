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
// db.favorite.find(
//   {where:{imdbid:'tt0903624'} })
// .then(function(favorite){
//   favorite.createComment({
//     comment:'1st comment on hobbit 1'
//   }).then(function(comment){
//     console.log(comment.get());
//   });
//   console.log(favorite.get());
// });


//find 1 fav - get comments
// db.favorite.find(
//   {where:{imdbid:'tt0903624'} })
// .then(function(favorite){
//   favorite.getComments().then(function(comments){
//        console.log('comment count',comments.length);
//        comments.forEach(function(comment){
//       console.log('------');
//       console.log(comment.get());

//   });
//   console.log(favorite);
//   });
// });


// //find 1 author - get comments
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

// // create a tag
// db.tag.create({tag:'theGreatist'}).then(function(data){
//   console.log(data.get());
// });

// findOrCreate tag; add to favorite
db.favorite.find({
  where: {id: 5} }).then(function(favorite) {
  db.tag.findOrCreate( {
      where: {tag: "fantasy"}})
  .spread(function(tag, created) {
    favorite.addTag(tag).then(function() {
      console.log("a favorite title "+favorite.title+" mow has a tag of "+tag.tag);
    });
    // console.log(tag.get());
  });
});
