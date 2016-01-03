var express 	= require('express');
var router 		= express.Router();
var getTweets   = require('./getTweets');

var tweets  = [];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Twitter Feed' });
  //getTweets(res,'index');
});

module.exports = router;

