var express 	= require('express');
var router 		= express.Router();
var getTweets   = require('./getTweets');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Twitter Feed' });
  	getTweets(req,res,'allTweets',req.query.order);
});

module.exports = router;

