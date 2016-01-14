var mongodb 		= require('mongodb');

//code for DB
module.exports = function(addTweets,top,tweets_to_add,filter,res) 
{
	var MongoClient = mongodb.MongoClient;
	var url = 'mongodb://localhost:27017/twfDB';
	MongoClient.connect(url, function (err, db) {
	  if (err) {
	    console.log('Unable to connect to the mongoDB server. Error:', err);
	  } else {
	    console.log('Connection established to', url);
	    //tweets(db,top);
		addTweets(db,tweets_to_add,filter);
	    //hashtags();
	  }
	});
};