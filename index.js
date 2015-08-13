var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var parseurl = require('parseurl');

var app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

var ejsLayouts = require('express-ejs-layouts');
var request = require('request');

app.use(ejsLayouts);
app.use(express.static(__dirname + '/public'));

require('express-helpers')(app);

// app.use(session({
//   genid: function(req) {
//     return genuuid() // use UUIDs for session IDs
//   },
//   secret: 'keyboard cat'
// }));




app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use(function (req, res, next) {
  var views = req.session.views

  if (!views) {
    views = req.session.views = {};
  }

  // get the url pathname
  var pathname = parseurl(req).pathname

  // count the views
  views[pathname] = (views[pathname] || 0) + 1


  var lastPath = req.session.lastPath;
  if (!lastPath) {
    lastPath = req.session.lastPath = [];
  }
  req.session.lastPath = pathname;

  next();
});

app.get('/foo', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
});

app.get('/bar', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/bar'] + ' times')
});

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
app.use('/tags',require('./controllers/tags.js'));

app.listen(3090);


