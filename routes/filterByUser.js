var express         = require('express');

module.exports = function (user,res,path)
{	
	var users;
	users = user.split(",");
	var mongodb 	= require('mongodb');
	var MongoClient = mongodb.MongoClient;
	var url = 'mongodb://localhost:27017/twfDB';
	MongoClient.connect(url, function (err, db) 
	{	
		if (err) {
			console.log('Unable to connect to the mongoDB server. Error:', err);
			db.close();
		} 
		else 
		{
			db.collection('tweets').find({'tweet.user.screen_name': {$in: users}}).sort({'tweet.id' : -1}).toArray(function(err, tweets) {
				db.collection('tweets').distinct( 'filter'  ,function(err, filter_options)
		        {
		          	if (err){
		            	console.log('Error at distinct');
		            	db.close();
		          	}
		        	else{
			          	db.collection('tweets').distinct( 'tweet.user.screen_name'  ,function(err, users_returned)
				        {
							if (err){
								console.log('Error at distinct');
								db.close();
							}
							else{
								db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, hashtags)
						        {
									if (err){
										console.log('Error at distinct');
										db.close();
									}
									else{
										res.render(path, { 'title': 'users' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort() , 'user': users,'hashtags': hashtags.sort()});
										db.close();
									}
						        });
							}
				        });
		          	}
		        });
			});
		}
	});
}