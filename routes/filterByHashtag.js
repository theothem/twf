var express         = require('express');

module.exports = function (users,hashtag,res,path)
{	
	var hashtags;
	hashtags = hashtag.split(",");

	var usrs = users.split(",");
	var mongodb 	= require('mongodb');
	var MongoClient = mongodb.MongoClient;
	var url = 'mongodb://localhost:27017/twfDB';
	MongoClient.connect(url, function (err, db) 
	{	
		if (err) {
			console.log('Unable to connect to the mongoDB server. Error:', err);
		} 
		else 
		{
			if (hashtag == '')
			{
				db.collection('tweets').find({'tweet.user.screen_name': {$in: usrs}}).sort({'tweet.id' : -1}).toArray(function(err, tweets) {
					db.collection('tweets').distinct( 'filter'  ,function(err, filter_options)
			        {
			          	if (err)
			            	console.log('Error at distinct');
			        	else{
				          	db.collection('tweets').distinct( 'tweet.user.screen_name'  ,function(err, users_returned)
					        {
								if (err)
									console.log('Error at distinct');
								else{
									db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, fhashtags)
							        {
										if (err)
											console.log('Error at distinct');
										else{
											res.render(path, { 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort(), 'user': users ,'hashtags': fhashtags.sort() , 'url': hashtags});
										}
							        });
									
								}
					        });
			          	}
			        });
				});
			}
			else if ((users == '')&&(hashtag != ''))
			{
				db.collection('tweets').find({'tweet.entities.hashtags.text': {$in: hashtags}}).sort({'tweet.id' : -1}).toArray(function(err, tweets) {
					db.collection('tweets').distinct( 'filter'  ,function(err, filter_options)
			        {
			          	if (err)
			            	console.log('Error at distinct');
			        	else{
				          	db.collection('tweets').distinct( 'tweet.user.screen_name'  ,function(err, users_returned)
					        {
								if (err)
									console.log('Error at distinct');
								else{
									db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, fhashtags)
							        {
										if (err)
											console.log('Error at distinct');
										else{
											res.render(path, { 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort(), 'user': users ,'hashtags': fhashtags.sort() , 'url': hashtags});
										}
							        });
									
								}
					        });
			          	}
			        });
				});
			}
			else
			{
				db.collection('tweets').find({'tweet.entities.hashtags.text': {$in: hashtags},'tweet.user.screen_name': {$in: usrs}}).sort({'tweet.id' : -1}).toArray(function(err, tweets) {
					db.collection('tweets').distinct( 'filter'  ,function(err, filter_options)
			        {
			          	if (err)
			            	console.log('Error at distinct');
			        	else{
				          	db.collection('tweets').distinct( 'tweet.user.screen_name'  ,function(err, users_returned)
					        {
								if (err)
									console.log('Error at distinct');
								else{
									db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, fhashtags)
							        {
										if (err)
											console.log('Error at distinct');
										else{
											res.render(path, { 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort(), 'user': users ,'hashtags': fhashtags.sort() , 'url': hashtags});
										}
							        });
									
								}
					        });
			          	}
			        });
				});
			}
		}
	});
}