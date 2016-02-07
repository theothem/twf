var express 	= require('express');
var router 		= express.Router();
var getTweets   = require('./getTweets');
var mongodb     = require('mongodb');

var tweets  = [];
/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Twitter Feed' });
  console.log('Load_Options triggered!');

    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/twfDB';
    MongoClient.connect(url, function (err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
        console.log('Connection established to', url);
        db.collection('tweets').distinct( 'filter'  ,function(err, filter_options)
        {
          if (err)
            console.log('Error at distinct');
          else{
            //console.log(filter_options);
            res.render('index', { 'load_options':  filter_options , title: 'Twitter Feed' });
            db.close();
          }
        });
      }
    });
  //getTweets(res,'index');
});

module.exports = router;

