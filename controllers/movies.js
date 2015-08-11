var db = require('../models');
var express = require('express');
var router = express.Router();
var request = require('request');

// my movie constructor
function Movie(imdbID, Title, Year, Type) {
  this.imdbID = imdbID;
  this.Title = Title;
  this.Year = Year;
  this.Type = Type;
}
// {
// Title: "The Star Wars Holiday Special",
// Year: "1978",
// imdbID: "tt0193524",
// Type: "movie"
// }

// movie index
router.get("/", function(req, res) {
  // res.send(req.query.q);
  var q = req.query.q
  // var movies = [];

  if (q) {
    // res.send(q);
    // http://www.omdbapi.com/?s=matrix
    var url = 'http://www.omdbapi.com/?s='+q;
    request(url, function(error, response, data) {
      var parsedData = JSON.parse(data);
      // res.send(parsedData.Search);
      if (parsedData.Search) {

// /movies?q=star+wars
         res.render('movies/index', {
            movies: parsedData.Search,
            q: q
         });
      } else {
        console.log('no results!');
        res.redirect('/');
      }
    });
  } else {
    res.redirect('/');
  }
});

// show movie details page
router.get("/:imdbID", function(req, res) {
   // res.send (req.params);

    var imdbID = req.params.imdbID;
    // http://www.omdbapi.com/?i=tt0133093
    var url = 'http://www.omdbapi.com/?plot=full&tomatoes=true&r=json&i='+imdbID;
    request(url, function(error, response, data) {
      db.favorite.find({where:{imdbid:imdbID}})
      .then(function(favorite) {
        var parsedData = JSON.parse(data);
        // res.send(parsedData);
        var isFavorite = (favorite);
        if (parsedData) {
          res.render('movies/show', {
              movie: parsedData,
              isFavorite: isFavorite,
              prevPage: req.headers['referer']
           });
        } else {
          console.log('no results!');
          res.redirect('/movies/index');
        }
      });
    });
});


module.exports = router;