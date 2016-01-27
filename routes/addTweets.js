var express = require('express');
var readline = require('readline');
var HashTable = require('hashtable');
var router = express.Router();

var Twitter = require('twitter');
var tweet = new Twitter({
	consumer_key: 'V8rXtXf4upxHh2y5lNYtpX7kD',
	consumer_secret: 'SQuo8ep3sgow4LrqRwA3PziwDP1ZCs3u8RZ52iSFKxxn96Jhg7',
	access_token_key: '970429705-Sax8m6U0DZTQCLPpmKndU7HRcza1UbAM7EPO9GGx',
	access_token_secret: 'l27GcJQdwM1FzuIuqGC5i8PV15AYYrF53RCQI06rJWoAF'
});


module.exports = function(res,db,tweets_to_add,filter) 
{
	var added 				= 0;
	var duplicates  		= 0;
	console.log("Added tweets to DataBase\n");

	var myCallback = function(data) {
	  	//insert data
      	//console.log('Collected         : '+tweets_to_add.length+' tweets.\n');
		//console.log('Duplicates User   : '+tweets_to_add.length-data+'.\n');
		//console.log('Added to database : '+data+' new tweets.\n');
		res.render('../public/js/index' ,{ resp : 'ok' } );
	};

	var usingItNow = function(callback,tweets_to_add) {
		var i=0;
		for(i=0;i<tweets_to_add.length;i++)
		{	
			db.collection('tweets').insert(  {'_id' : tweets_to_add[i].id_str , 'filter': filter ,'tweet' : tweets_to_add[i] }  ,function(err, doc)
			{
			  	if (err){
			  		// error occured since _id=1 already existed
			    	duplicates++;
			  	}
			  	else{  
			  		// no error, inserted new document, with _id=1
			  		added++;
			  	}
			});
		}
	  	callback(added);
	};

	usingItNow(myCallback,tweets_to_add);
};