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

var hashtable 	= new HashTable();


module.exports = function(db) 
{
	var public_tweets 	= [] ;
	var user_tweets   	= [] ;
	var all_tweets    	= [] ;
	var hashtag_tweets;

	var added 				= 0;
	var duplicates_user  	= 0;
	var duplicates_public	= 0;
	console.log("Processing Data...\n");

	//get user tweets
	tweet.get('statuses/home_timeline', {count : 200 }, function(error, user_tweets, response)
	{
		if (user_tweets == 'Rate limit exceeded'){
			console.log("Rate Limit Exceeded , wait 15 min to get more tweets...\n");
		}
		else 
		{
			console.log('Collected         : '+user_tweets.length+' tweets ( User ).\n');
			//console.log(user_tweets[0]);
			var i=0;
			for(i=0;i<user_tweets.length;i++)
			{
				var twet  = user_tweets[i].id;
				
				//console.log(i);
				db.collection('tweets').insert(  {'_id' : user_tweets[i].id , 'tweet' : user_tweets[i] }  ,function(err, doc)
				{
				  	if (err){
				  		// error occured since _id=1 already existed
				    	//console.log('Error occured since id: '+ twet +' already existed');
				    	duplicates_user++;
				  	}
				  	else{  
				  		// no error, inserted new document, with _id=1
				  		added++;
				  	}
				});
				
				
			}
			copy(user_tweets,all_tweets);
			
			//mongoose.tweets.insert(user_tweets);
		}
	});
	
	// Get public tweets and set all_tweets

	tweet.stream('statuses/sample', {"with" : "followings"}, function(stream)	//get public tweets in 7 seconds
	{		
	    
	    stream.on('data' , function(data){
	        public_tweets.push(data);
	        all_tweets.push(data);
	        
	        //insert public tweets to database
	        var twet  = data.id;
	        if (twet)
	        {
	        	db.collection('tweets').insert(  {'_id' : data.id , 'tweet' : data }  ,function(err, doc)
				{
				  	if (err){
				  		// error occured since _id=1 already existed
				    	//console.log('Error occured since id: '+ twet +' already existed');
				    	duplicates_public++;
				  	}
				  	else{  
				  		// no error, inserted new document, with _id=1
				  		added++;
				  	}
				});
	        }
	        else
	        {
	        	duplicates_public++;
	        }
	    });
	    
	    setTimeout(function(){
				console.log('Collected         : '+public_tweets.length+' tweets ( Public ).\n');
				console.log('Total             : '+all_tweets.length   +' tweets ( Total  ).\n');
				console.log('Duplicates User   : '+duplicates_user+'.\n');
				console.log('Duplicates Public : '+duplicates_public+'.\n');
				console.log('Duplicates Total  : '+(duplicates_public+duplicates_user)+'.\n');
				console.log('Added to database : '+added+' new tweets.\n');
	          stream.destroy();
	    },7000);
	});
};

function copy(a , b) {
   var i=0;
   for (i=0;i<a.length;i++)
   {
   		b.push(a[i]);
   }
}
