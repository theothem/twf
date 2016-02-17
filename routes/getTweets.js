var express         = require('express');
var last_get		= 0;
var view_tweets		= [];
var csrf            = require('csurf'); 
var session         = require('client-sessions');

module.exports = function (req,res,path,order,skip)
{
	var mongodb 	= require('mongodb');
	var router 		= express.Router();

	if ((skip == undefined) || (skip == null))
		skip = 0;

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
			if ((skip!= 0)&&(skip!=undefined))
			{
				if (order == 'favorites')
				{
					db.collection('tweets').find().sort({'tweet.favorite_count' : -1}).limit(20).skip(skip).toArray(function(err, tweets) {
						db.collection('tweets').distinct( 'filter'  ,function(err, filter_options)
				        {
				          	if (err){
				            	console.log('Error at distinct');
				            	db.close();
				          	}
				        	else{
					          	db.collection('tweets').distinct( 'tweet.user.screen_name'  ,function(err, users)
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
												res.json(tweets);
												db.close();
											}
								        });
									}
						        });
				          	}
				        });
					});
				}
				else if (order == 'retweets')
				{
					db.collection('tweets').find().sort({'tweet.retweet_count' : -1}).limit(20).skip(skip).toArray(function(err, tweets) {
						db.collection('tweets').distinct( 'filter'  ,function(err, filter_options)
				        {
				          	if (err){
				            	console.log('Error at distinct');
				            	db.close();
				          	}
				        	else{
					          	db.collection('tweets').distinct( 'tweet.user.screen_name'  ,function(err, users)
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
												res.json(tweets);
												db.close();
											}
								        });
									}
						        });
				          	}
				        });
					});
				}
				else if (order == 'dateDown')
				{
					db.collection('tweets').find().sort({'tweet.id' : 1}).limit(20).skip(skip).toArray(function(err, tweets) {
						db.collection('tweets').distinct( 'filter'  ,function(err, filter_options)
				        {
				          	if (err){
				            	console.log('Error at distinct');
				            	db.close();
				          	}
				        	else{
					          	db.collection('tweets').distinct( 'tweet.user.screen_name'  ,function(err, users)
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
												res.json(tweets);
												db.close();
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
					db.collection('tweets').find().sort({'tweet.id' : -1}).limit(20).skip(skip).toArray(function(err, tweets) {
						db.collection('tweets').distinct( 'filter'  ,function(err, filter_options)
				        {
				          	if (err){
				            	console.log('Error at distinct');
				            	db.close();
				          	}
				        	else{
					          	db.collection('tweets').distinct( 'tweet.user.screen_name'  ,function(err, users)
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
											    res.json(tweets);
												db.close();
											}
								        });
									}
						        });
				          	}
				        });
					});
				}
			}
			else
			{
				if (order == 'favorites')
				{
					db.collection('tweets').find().sort({'tweet.favorite_count' : -1}).limit(20).toArray(function(err, tweets) {
						db.collection('tweets').distinct( 'filter'  ,function(err, filter_options)
				        {
				          	if (err){
				            	console.log('Error at distinct');
				            	db.close();
				          	}
				        	else{
					          	db.collection('tweets').distinct( 'tweet.user.screen_name'  ,function(err, users)
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
												res.render(path, { title: 'Twitter Feed',user:req.session.user.username, tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users.sort() , 'hashtags': hashtags.sort(), csrfToken: req.csrfToken() });
												db.close();
											}
								        });
									}
						        });
				          	}
				        });
					});
				}
				else if (order == 'retweets')
				{
					db.collection('tweets').find().sort({'tweet.retweet_count' : -1}).limit(20).toArray(function(err, tweets) {
						db.collection('tweets').distinct( 'filter'  ,function(err, filter_options)
				        {
				          	if (err){
				            	console.log('Error at distinct');
				            	db.close();
				          	}
				        	else{
					          	db.collection('tweets').distinct( 'tweet.user.screen_name'  ,function(err, users)
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
												res.render(path, { title: 'Twitter Feed',user:req.session.user.username, tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users.sort() , 'hashtags': hashtags.sort(),csrfToken: req.csrfToken()});
												db.close();
											}
								        });
									}
						        });
				          	}
				        });
					});
				}
				else if (order == 'dateDown')
				{
					db.collection('tweets').find().sort({'tweet.id' : 1}).limit(20).toArray(function(err, tweets) {
						db.collection('tweets').distinct( 'filter'  ,function(err, filter_options)
				        {
				          	if (err){
				            	console.log('Error at distinct');
				            	db.close();
				          	}
				        	else{
					          	db.collection('tweets').distinct( 'tweet.user.screen_name'  ,function(err, users)
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
												res.render(path, { title: 'Twitter Feed',user:req.session.user.username, tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users.sort() , 'hashtags': hashtags.sort(),csrfToken: req.csrfToken()});
												db.close();
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
					db.collection('tweets').find().sort({'tweet.id' : -1}).limit(20).toArray(function(err, tweets) {
						db.collection('tweets').distinct( 'filter'  ,function(err, filter_options)
				        {
				          	if (err){
				            	console.log('Error at distinct');
				            	db.close();
				          	}
				        	else{
					          	db.collection('tweets').distinct( 'tweet.user.screen_name'  ,function(err, users)
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
												res.render(path, { title: 'Twitter Feed',user:req.session.user.username, tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users.sort() , 'hashtags': hashtags.sort(),csrfToken: req.csrfToken()});
												db.close();
											}
								        });
									}
						        });
				          	}
				        });
					});
				}
			}
		}
	});
}