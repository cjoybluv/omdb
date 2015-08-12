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
  db.favorite.findAll({
    include:[db.comment]
  }).then(function(favorites){
      res.render('favorites/index',{
        favorites:favorites
      });
  });
});


router.delete('/:id',function(req,res){
  // res.send('delete this fave');
  db.favorite.destroy({where:{id:req.params.id}})
  .then(function (){
    res.redirect('/favorites');
  });
});


// enter new? tag on favorite
router.get('/:id/tags/new', function(req, res) {
  db.favorite.findById(parseInt(req.params.id)).then(function(favorite) {
    favorite.getTags().then(function(tags) {
      res.render('tags/new', {
        favorite: favorite,
        tags: tags
      });
    });
  });
});

// create new tag (if needed), tag favorite!
router.post('/:id/tags', function(req, res) {
  // res.send("The tag name: " + req.body.tagName + "<br>The post id: " + req.params.id);
  var newTag = req.body.tag;
  var favoriteId = req.params.id;

  db.favorite.findById(favoriteId).then(function(favorite) {
    db.tag.findOrCreate({where: {tag: newTag}}).spread(function(tag, created) {
      favorite.addTag(tag).then(function() {
        res.redirect('/favorites');
      })
    });
  });
});



router.get('/:id/comments', function(req,res) {
  db.favorite.findById(parseInt(req.params.id)).then(function(favorite){
    favorite.getComments().then(function(comments){
      // console.log('comments',comments);
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
      res.redirect('/favorites/'+req.params.id+'/comments');
    });
  });
});


module.exports = router;


