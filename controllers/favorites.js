var db = require('../models');
var express = require('express');
var router = express.Router();


router.post('/', function(req, res) {

  // db.favorite.create({ imdbid: req.body.imdbId, title: req.body.title, year: req.body.year, poster: req.body.poster })
  //          .then(function(data) {
  //             console.log('<<<  FAVORITE CREATED >>>');
  //             res.redirect('/movies/'+data.imdbid);
  //   });

  db.favorite
    .findOrCreate({where: { imdbid: req.body.imdbId, title: req.body.title, year: req.body.year, poster: req.body.poster }})
    .spread(function(favorite, created) {
      console.log(favorite); // returns info
      res.redirect('/movies/'+favorite.imdbid);
    });

  // res.send(req.body);
});



//   GET /favorites - list
router.get('/', function(req, res){
  // res.send('posts home page!!');
  db.favorite.findAll().then(function(favorites){
      res.render('favorites/index',{
        favorites:favorites
      });
  });
});

// // POSTS /posts - create new post
// router.post('/',function(req, res){
//   db.favorite.findById(req.body.favorite).then(function(favorite){
//     favorite.createPost({
//       title:req.body.title,
//       content:req.body.content
//     }).then(function(post){
//       res.redirect('/posts');
//     });
//   });
//   // res.send(req.body);
// });

module.exports = router;