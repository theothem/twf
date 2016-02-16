var express 	= require('express');
var router 		= express.Router();
var getTweets   = require('./getTweets');
var mongodb     = require('mongodb');

var tweets  = [];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Twitter Feed' });
});

module.exports = router;

