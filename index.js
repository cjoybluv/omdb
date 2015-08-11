var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));


var ejsLayouts = require('express-ejs-layouts');
var request = require('request');

app.use(ejsLayouts);
app.use(express.static(__dirname + '/public'));

require('express-helpers')(app);

// // breadcrumbs
// var breadcrumbs = require('express-breadcrumbs');
// app.use(breadcrumbs.init());

// // Set Breadcrumbs home information
// app.use(breadcrumbs.setHome());

// // Mount the breadcrumbs at home
// app.use('/', breadcrumbs.setHome({
//   name: 'Home',
//   url: '/'
// }));

// home page
app.get("/", function(req, res) {
  res.render('main/index');
});

app.use('/movies',require('./controllers/movies.js'));

app.use('/favorites',require('./controllers/favorites.js'));

app.listen(3090);


