var express 	= require('express');
var Twitter 	= require('twitter');

var tweet 		= new Twitter({
	consumer_key: 'V8rXtXf4upxHh2y5lNYtpX7kD',
	consumer_secret: 'SQuo8ep3sgow4LrqRwA3PziwDP1ZCs3u8RZ52iSFKxxn96Jhg7',
	access_token_key: '970429705-Sax8m6U0DZTQCLPpmKndU7HRcza1UbAM7EPO9GGx',
	access_token_secret: 'l27GcJQdwM1FzuIuqGC5i8PV15AYYrF53RCQI06rJWoAF'
});

module.exports = function(query,callback,option,date,user_option) 
{
    if (query != '') 
    {
    	if (option == 1)	
    	{
    		//Returns tweets created before the given date
    		console.log("Getting tweets...option :"+date);
			tweet.get('search/tweets', { q: query , count: 200, until: date}, function(error, hashtag_tweets, response) 
			{
				if (error)
			    {
			    	console.log('Error getting user tweets for: '+query+'. "'+error.description+'"');
			    	callback(null);
			    	return;
			    }
				else{
					console.log('Collected '+hashtag_tweets.statuses.length+' tweets for query : '+query+'.\n');
					if ((hashtag_tweets.statuses.length == 0)||(hashtag_tweets.statuses.length == undefined)){
						callback(null);
			    		return;
					}
					else{
						if ((hashtag_tweets.statuses.length == undefined)||(hashtag_tweets.statuses.length == 0)){
							callback(null);
				    		return;
						}
						else{
							callback(hashtag_tweets.statuses);
						}
					}
				}
			});
    	}
    	else if (user_option == 1)	// If you search Tweets for specific user!
    	{
    		console.log("Getting tweets for user "+query+"...");
			tweet.get('statuses/user_timeline', { screen_name: query , count: 200}, function(error, all_tweets, response) 
			{
				if (error)
			    {
			    	console.log('Error getting user tweets for: '+query+'. "'+error.description+'"');
			    	callback(null);
			    	return;
			    }
				else{
					console.log('Collected         : '+all_tweets.length+' tweets for user : '+query+'.\n');
					callback(all_tweets);
				}
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
			    	callback(null);
			    	return;
			    }
			    else{
			    	console.log('Collected         : '+all_tweets.statuses.length+' tweets ( User ) for query : '+query+'.\n');
					if ((all_tweets.statuses.length == undefined)||(all_tweets.statuses.length == 0)){
						callback(null);
			    		return;
					}
					else{
						callback(all_tweets.statuses);
					}
				}
			});
    	}
    }
};