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

module.exports = function() 
{
	//wait while user gives you hashtag to search

	var rl = readline.createInterface({
	   	input: process.stdin
	});
	
	rl.on('line', function(line){
		lin = line;
		var _flagCheck = setInterval(function() {
	    if (lin!='') {
	        clearInterval(_flagCheck);
	        get_Hashtag(lin);
	    }
		}, 100); // interval set at 100 milliseconds
	});
};

function print_HashTable_listElements(key, value, c){
	console.log('#'+key);
}

function print_All_HashTable_Elements(key, value, c) {
  console.log('#'+key + ' : \n');
  value.forEach(print_HashTable_listElements);
  console.log('\n');
}

function get_Hashtag(lin){	// Read hashtag from command line and search for tweets in twitter API
	if (lin == 'exit'){
		hashtable.forEach(print_All_HashTable_Elements);
		return;
	}
	console.log("Getting hashtags...\n");
	tweet.get('search/tweets', { q: lin , count: 200}, function(error, hashtag_tweets, response) 
	{
		console.log('Collected '+hashtag_tweets.statuses.length+'tweets for query : '+lin+'.\n');

		if (lin[0] == '#'){
			lin = lin.substring(1, lin.length);
		}

		hashtable.put(lin, [] );

		var j=0;
		for (j=0;j<hashtag_tweets.statuses.length;j++)
		{
			var i=0;
			for (i=0;i<hashtag_tweets.statuses[j].entities.hashtags.length;i++)
			{
				if ((hashtag_tweets.statuses[j].entities.hashtags[i].text != lin) && (hashtable.get(lin).indexOf(hashtag_tweets.statuses[j].entities.hashtags[i].text)==-1))
				{
					hashtable.get(lin).push(hashtag_tweets.statuses[j].entities.hashtags[i].text);
				}
			}
		}
		console.log(lin+' :');
		console.log(hashtable.get(lin));
	});
}