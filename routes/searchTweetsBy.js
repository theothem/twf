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

module.exports = function(query,callback,option,date) 
{
    if (query != '') 
    {
    	if (option == 1)	
    	{
    		//Returns tweets created before the given date
    		console.log("Getting tweets...option :"+date);
			tweet.get('search/tweets', { q: query , count: 200, until: dateFrom}, function(error, hashtag_tweets, response) 
			{
				console.log('Collected '+hashtag_tweets.statuses.length+' tweets for query : '+query+'.\n');
				callback(hashtag_tweets.statuses);
			});
    	}
    	else 
    	{
    		console.log("Getting tweets...\n");
			tweet.get('search/tweets', { q: query , count: 200}, function(error, hashtag_tweets, response) 
			{
				console.log('Collected '+hashtag_tweets.statuses.length+' tweets for query : '+query+'.\n');
				callback(hashtag_tweets.statuses);
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
