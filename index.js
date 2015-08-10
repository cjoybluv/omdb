var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public'));

require('express-helpers')(app);

// breadcrumbs
var breadcrumbs = require('express-breadcrumbs');
app.use(breadcrumbs.init());

// Set Breadcrumbs home information
app.use(breadcrumbs.setHome());

// Mount the breadcrumbs at home
app.use('/', breadcrumbs.setHome({
  name: 'Home',
  url: '/'
}));

// home page
app.get("/", function(req, res) {
  res.render('main/index', {
    breadcrumbs: req.breadcrumbs()
  });
});


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
app.get("/movies", function(req, res) {
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
         req.breadcrumbs({name: 'Search List',url: 'movies?q='+q});
         res.render('movies/index', {
            breadcrumbs: req.breadcrumbs(),
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
app.get("/movies/:imdbID", function(req, res) {
   // res.send (req.params);

    var imdbID = req.params.imdbID;
    // http://www.omdbapi.com/?i=tt0133093
    var url = 'http://www.omdbapi.com/?plot=full&tomatoes=true&r=json&i='+imdbID;
    request(url, function(error, response, data) {
      var parsedData = JSON.parse(data);
      // res.send(parsedData);

      if (parsedData) {
        req.breadcrumbs({name: 'Show Movie',url: '/movies/'+req.params.imdbID});
        res.render('movies/show', {
            breadcrumbs: req.breadcrumbs(),
            movie: parsedData,
            prevPage: req.headers['referer']
         });
      } else {
        console.log('no results!');
        res.redirect('/movies/index');
      }
    });
});




app.listen(3090);


