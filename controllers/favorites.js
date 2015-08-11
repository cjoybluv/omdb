var db = require('../models');
var express = require('express');
var router = express.Router();


router.post('/', function(req, res) {

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

router.get('/:id/comments', function(req,res) {
  db.favorite.findById(parseInt(req.params.id)).then(function(favorite){
    favorite.getComments().then(function(comments){
      console.log('comments',comments);
      res.render('favorites/comment', {
        favorite: favorite,
        comments: comments
      });
    });
  });
});

router.post('/:id/comments', function(req,res) {
  db.favorite.findById(req.body.favorite).then(function(favorite){
    favorite.createComment({
      comment: req.body.comment
    }).then(function(comment){
      res.redirect('/favorites');
    });
  });
});



module.exports = router;