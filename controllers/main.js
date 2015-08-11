var db = require('../models');
var express = require('express');
var router = express.Router();



//   GET / root - app home
router.get('/', function(req, res){
  db.favorite.findAll({include:[db.post]}).then(function(favorites){
      res.render('index',{favorites: favorites});
  });
});

module.exports = router;