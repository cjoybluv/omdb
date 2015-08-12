var db = require('../models');
var express = require('express');
var router = express.Router();


// router.post('/', function(req, res) {

//   db.favorite
//     .findOrCreate({where: { imdbid: req.body.imdbId, title: req.body.title, year: req.body.year, poster: req.body.poster }})
//     .spread(function(favorite, created) {
//       console.log(favorite); // returns info
//       res.redirect('/movies/'+favorite.imdbid);
//     });
//   // res.send(req.body);
// });

var zip = function(array1, array2) {
  var zipped = [], len2 = array2.length;
  for (var i = 0;i<array1.length;i++) {
    zipped[i] = [];
    zipped[i][0] = array1[i];
    if (i<len2) {zipped[i][1] = array2[i];}
  }
  return zipped;
};


//   GET /favorites - list
router.get('/', function(req, res){
  // res.send('posts home page!!');
  db.tag.findAll({
    include:[db.favorite]
  }).then(function(tags){
      var tagCounts = tags.map(function(tag) {
        return tag.favorites.length;
      });
      var sortTags = zip(tags,tagCounts).sort(function(a,b){
        if (a[1] < b[1]) {
          return 1;
        }
        if (a[1] > b[1]) {
          return -1;
        }
        return 0;
      });
      // res.send(sortTags);
      res.render('tags/index',{
        tags:sortTags
      });
  });
});

router.get('/:id', function(req, res) {
  // res.send(req.params.id);
  db.tag.findById(parseInt(req.params.id)).then(function(tag){
    tag.getFavorites({
          include:[db.comment]
        }).then(function(favorites){
      res.render('favorites/index',{
        tag: tag.tag,
        favorites: favorites
      });
    });
   });
});

module.exports = router;

