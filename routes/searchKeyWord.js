var express         = require('express');

module.exports = function (search,res,path)
{	
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
				db.collection('tweets').find({	
					'tweet.entities.hashtags.text'	: {$in: search}}).sort({'tweet.id' : -1}).toArray(function(err, tweets) 
				  	{
						db.collection('tweets').find({'tweet.user.screen_name': {$in: search}}).sort({'tweet.id' : -1}).toArray(function(err, tweets) 
				  		{
				  			db.collection('tweets').find({'tweet.user.name': {$in: search}}).sort({'tweet.id' : -1}).toArray(function(err, tweets) 
				  			{
				  				db.collection('tweets').find({'tweet.created_at': {$in: search}}).sort({'tweet.id' : -1}).toArray(function(err, tweets) 
				  				{
				  					db.collection('tweets').find({'tweet.text': {$in: search}}).sort({'tweet.id' : -1}).toArray(function(err, tweets) 
				  					{
				  						db.collection('tweets').find({'tweet.source': {$in: search}}).sort({'tweet.id' : -1}).toArray(function(err, tweets) 
				  						{

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
																	res.render(path, { 'title': 'search' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort() ,'hashtags': fhashtags.sort()});
																}
													        });
															
														}
											        });
									          	}
									        });
										});
									});
								});
							});
						});
					});
		}
	});
}