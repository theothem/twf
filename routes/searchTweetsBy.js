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

var hashtable = new HashTable();

module.exports = function(query,callback,option,date,user_option) 
{
	var public_tweets 	= [] ;
	var all_tweets    	= [] ;


    if (query != '') 
    {
    	if (option == 1)	
    	{
    		//Returns tweets created before the given date
    		console.log("Getting tweets...option :"+date);
			tweet.get('search/tweets', { q: query , count: 200, until: date}, function(error, hashtag_tweets, response) 
			{
				console.log('Collected '+hashtag_tweets.statuses.length+' tweets for query : '+query+'.\n');
				callback(hashtag_tweets.statuses);
			});
    	}
    	else if (user_option == 1)	// If you search Tweets from specific user!
    	{
    		console.log("Getting tweets for user "+query+"...");
			tweet.get('statuses/user_timeline', { screen_name: query , count: 200}, function(error, all_tweets, response) 
			{
				if (error)
			    {
			    	console.log('Error getting user tweets for: '+query+'. "'+error.description+'"');
			    	return;
			    }
				console.log('Collected         : '+all_tweets.length+' tweets for user : '+query+'.\n');
				callback(all_tweets);
			});
    	}
    	else 
    	{
    		console.log("Getting tweets for query "+query+"...");
			tweet.get('search/tweets', { q: query , count: 200}, function(error, all_tweets, response) 
			{
				if (error)
			    {
			    	console.log('Error getting tweets for: '+query+'. "'+error.description+'"');
			    	return;
			    }
			    if (all_tweets.statuses != undefined)
					console.log('Collected         : '+all_tweets.statuses.length+' tweets ( User ) for query : '+query+'.\n');
				callback(all_tweets.statuses);
				//callback(user_tweets.statuses);
				/*	put them in query HashTable
				if (query[0] == '#'){
					query = lin.substring(1, query.length);
				}

				hashtable.put(query, [] );

				var j=0;
				for (j=0;j<hashtag_tweets.statuses.length;j++)
				{
					var i=0;
					for (i=0;i<hashtag_tweets.statuses[j].entities.hashtags.length;i++)
					{
						if ((hashtag_tweets.statuses[j].entities.hashtags[i].text != query) && (hashtable.get(query).indexOf(hashtag_tweets.statuses[j].entities.hashtags[i].text)==-1))
						{
							hashtable.get(query).push(hashtag_tweets.statuses[j].entities.hashtags[i].text);
						}
					}
				}
				console.log(query+' :');
				console.log(hashtable.get(query));
				*/
			});
    	}
    }
};