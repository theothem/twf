var express         = require('express');
var last_get		= 0;
var view_tweets		= [];
module.exports = function (res,path)
{
	var readline 	= require('readline');
	var HashTable 	= require('hashtable');
	var mongodb 	= require('mongodb');
	var router 		= express.Router();

	var hashtable 	= new HashTable();

	var MongoClient = mongodb.MongoClient;
	var url = 'mongodb://localhost:27017/twfDB';
	MongoClient.connect(url, function (err, db) {
		
		if (err) {
			console.log('Unable to connect to the mongoDB server. Error:', err);
		} 
		else 
		{
			db.collection('tweets').find().sort({'tweet.id' : -1}).limit(50).toArray(function(err, tweets) {
					res.render(path, { tweet_data: tweets });
			    });
		/*	console.log('Connection established to', url);
			if (option === 0)
			{
				db.collection('tweets').find().sort({'tweet.id' : -1}).limit(50).toArray(function(err, tweets) {
					last_get = tweets[49].tweet.id;
					console.log('LAST: '+last_get);

					view_tweets = view_tweets.concat(tweets);
					res.render('index', { tweet_data: view_tweets });
			    });
			}
			else
			{
				db.collection('tweets').find( { "tweet.id": { $lt: last_get } } ).sort({'tweet.id' : -1}).limit(50).toArray(function(err, tweets) {
					last_get = tweets[49].tweet.id;
					//console.log(last_get);
					
					view_tweets = view_tweets.concat(tweets);
					res.render('index', { tweet_data: view_tweets });
			    });
			}*/
		}
	});
}