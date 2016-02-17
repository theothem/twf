var express         = require('express');

module.exports = function (search,users,hashtags,date,req,res,path,order)
{	
	if ((search!=null)&&(search!=undefined))
		if (search.indexOf('/') > -1){
			search = dateToDate(search);
	}
	
	if (search == undefined)
		search = '';
	
	var all_tweets  = [];
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
			if ((users=='')&(hashtags=='')&(date==''))	//000
			{
				if (order == 'favorites')
				{
					db.collection('tweets').find({ $or: [ {'tweet.user.screen_name': { $regex: search , $options: 'i' }},{'tweet.user.name': { $regex: search , $options: 'i' }},{'tweet.created_at': { $regex: search , $options: 'i' }},{'tweet.entities.hashtags.text': { $regex: search , $options: 'i' }}, {'tweet.text': { $regex: search , $options: 'i' }} ] }).sort({'tweet.favorite_count' : -1}).limit(20).toArray(function(err, tweets) {
						if (err)
							console.log('Error searching for user: "'+search+'"');
						else
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, hashtags)
									        {
												if (err)
													console.log('Error at distinct');
												else{
													console.log(tweets.length);
													res.render(path, {usr:req.session.user.username, 'title': 'Twitter Feed' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort() ,'hashtags': hashtags.sort(),"searched":search});
													db.close();
												}
									        });
										}
							        });
					          	}
					        });
						}
					});
				}
				else if (order == 'retweets')
				{
					db.collection('tweets').find({ $or: [ {'tweet.user.screen_name': { $regex: search , $options: 'i' }},{'tweet.user.name': { $regex: search , $options: 'i' }},{'tweet.created_at': { $regex: search , $options: 'i' }},{'tweet.entities.hashtags.text': { $regex: search , $options: 'i' }}, {'tweet.text': { $regex: search , $options: 'i' }} ] }).sort({'tweet.retweet_count' : -1}).limit(20).toArray(function(err, tweets) {
						if (err)
							console.log('Error searching for user: "'+search+'"');
						else
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, hashtags)
									        {
												if (err)
													console.log('Error at distinct');
												else{
													console.log(tweets.length);
													res.render(path, {usr:req.session.user.username, 'title': 'Twitter Feed' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort() ,'hashtags': hashtags.sort(),"searched":search});
													db.close();
												}
									        });
										}
							        });
					          	}
					        });
						}
					});
				}
				else if (order == 'dateDown')
				{
					db.collection('tweets').find({ $or: [ {'tweet.user.screen_name': { $regex: search , $options: 'i' }},{'tweet.user.name': { $regex: search , $options: 'i' }},{'tweet.created_at': { $regex: search , $options: 'i' }},{'tweet.entities.hashtags.text': { $regex: search , $options: 'i' }}, {'tweet.text': { $regex: search , $options: 'i' }} ] }).sort({'tweet.id' : 1}).limit(20).toArray(function(err, tweets) {
						if (err)
							console.log('Error searching for user: "'+search+'"');
						else
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, hashtags)
									        {
												if (err)
													console.log('Error at distinct');
												else{
													console.log(tweets.length);
													res.render(path, {usr:req.session.user.username, 'title': 'Twitter Feed' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort() ,'hashtags': hashtags.sort(),"searched":search});
													db.close();
												}
									        });
										}
							        });
					          	}
					        });
						}
					});
				}
				else
				{
					db.collection('tweets').find({ $or: [ {'tweet.user.screen_name': { $regex: search , $options: 'i' }},{'tweet.user.name': { $regex: search , $options: 'i' }},{'tweet.created_at': { $regex: search , $options: 'i' }},{'tweet.entities.hashtags.text': { $regex: search , $options: 'i' }}, {'tweet.text': { $regex: search , $options: 'i' }} ] }).sort({'tweet.id' : -1}).limit(20).toArray(function(err, tweets) {
						if (err)
							console.log('Error searching for user: "'+search+'"');
						else
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, hashtags)
									        {
												if (err)
													console.log('Error at distinct');
												else{
													console.log(tweets.length);
													res.render(path, {usr:req.session.user.username, 'title': 'Twitter Feed' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort() ,'hashtags': hashtags.sort(),"searched":search});
													db.close();
												}
									        });
										}
							        });
					          	}
					        });
						}
					});
				}
			}
			if ((users=='')&(hashtags=='')&(date!=''))	//001
			{
				var backupDate = date;
				date = dateToDate(date);
				if (order == 'favorites')
				{
					db.collection('tweets').find({ 'tweet.created_at': { $regex: date , $options: 'i' }, $or: [ {'tweet.user.screen_name': { $regex: search , $options: 'i' }},{'tweet.user.name': { $regex: search , $options: 'i' }},{'tweet.entities.hashtags.text': { $regex: search , $options: 'i' }}, {'tweet.text': { $regex: search , $options: 'i' }} ] }).sort({'tweet.favorite_count' : -1}).limit(20).toArray(function(err, tweets) {
						if (err)
							console.log('Error searching for user: "'+search+'"');
						else
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, hashtags)
									        {
												if (err)
													console.log('Error at distinct');
												else{
													console.log('Len:'+tweets.length);
													res.render(path, {usr:req.session.user.username, 'title': 'Twitter Feed' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort() ,'hashtags': hashtags.sort(),"searched":search,"date":backupDate});
													db.close();
												}
									        });
										}
							        });
					          	}
					        });
						}
					});
				}
				else if (order == 'retweets')
				{
					db.collection('tweets').find({ 'tweet.created_at': { $regex: date , $options: 'i' }, $or: [ {'tweet.user.screen_name': { $regex: search , $options: 'i' }},{'tweet.user.name': { $regex: search , $options: 'i' }},{'tweet.entities.hashtags.text': { $regex: search , $options: 'i' }}, {'tweet.text': { $regex: search , $options: 'i' }} ] }).sort({'tweet.retweet_count' : -1}).limit(20).toArray(function(err, tweets) {
						if (err)
							console.log('Error searching for user: "'+search+'"');
						else
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, hashtags)
									        {
												if (err)
													console.log('Error at distinct');
												else{
													console.log('Len:'+tweets.length);
													res.render(path, {usr:req.session.user.username, 'title': 'Twitter Feed' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort() ,'hashtags': hashtags.sort(),"searched":search,"date":backupDate});
													db.close();
												}
									        });
										}
							        });
					          	}
					        });
						}
					});
				}
				else if (order == 'dateDown')
				{
					db.collection('tweets').find({ 'tweet.created_at': { $regex: date , $options: 'i' }, $or: [ {'tweet.user.screen_name': { $regex: search , $options: 'i' }},{'tweet.user.name': { $regex: search , $options: 'i' }},{'tweet.entities.hashtags.text': { $regex: search , $options: 'i' }}, {'tweet.text': { $regex: search , $options: 'i' }} ] }).sort({'tweet.id' : 1}).limit(20).toArray(function(err, tweets) {
						if (err)
							console.log('Error searching for user: "'+search+'"');
						else
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, hashtags)
									        {
												if (err)
													console.log('Error at distinct');
												else{
													console.log('Len:'+tweets.length);
													res.render(path, {usr:req.session.user.username, 'title': 'Twitter Feed' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort() ,'hashtags': hashtags.sort(),"searched":search,"date":backupDate});
													db.close();
												}
									        });
										}
							        });
					          	}
					        });
						}
					});
				}
				else
				{
					db.collection('tweets').find({ 'tweet.created_at': { $regex: date , $options: 'i' }, $or: [ {'tweet.user.screen_name': { $regex: search , $options: 'i' }},{'tweet.user.name': { $regex: search , $options: 'i' }},{'tweet.entities.hashtags.text': { $regex: search , $options: 'i' }}, {'tweet.text': { $regex: search , $options: 'i' }} ] }).sort({'tweet.id' : -1}).limit(20).toArray(function(err, tweets) {
						if (err)
							console.log('Error searching for user: "'+search+'"');
						else
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, hashtags)
									        {
												if (err)
													console.log('Error at distinct');
												else{
													console.log('Len:'+tweets.length);
													res.render(path, {usr:req.session.user.username, 'title': 'Twitter Feed' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort() ,'hashtags': hashtags.sort(),"searched":search,"date":backupDate});
													db.close();
												}
									        });
										}
							        });
					          	}
					        });
						}
					});
				}
			}
			if ((users=='')&(hashtags!='')&(date==''))	//010
			{
				var hashtags_var;
				hashtags_var = hashtags.split(",");
				if (order == 'favorites')
				{
					db.collection('tweets').find({ 'tweet.entities.hashtags.text': {$in: hashtags_var} ,$or: [ {'tweet.user.screen_name': { $regex: search , $options: 'i' }},{'tweet.user.name': { $regex: search , $options: 'i' }},{'tweet.created_at': { $regex: search , $options: 'i' }},{'tweet.entities.hashtags.text': { $regex: search , $options: 'i' }}, {'tweet.text': { $regex: search , $options: 'i' }} ] }).sort({'tweet.favorite_count' : -1}).limit(20).toArray(function(err, tweets) {
						if (err)
							console.log('Error searching for user: "'+search+'"');
						else
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, hashtags)
									        {
												if (err)
													console.log('Error at distinct');
												else{
													console.log(tweets.length);
													res.render(path, {usr:req.session.user.username, 'title': 'Twitter Feed' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort() ,'hashtags': hashtags.sort(),"searched":search,"url":hashtags_var});
													db.close();
												}
									        });
										}
							        });
					          	}
					        });
						}
					});
				}
				else if (order == 'retweets')
				{
					db.collection('tweets').find({ 'tweet.entities.hashtags.text': {$in: hashtags_var} ,$or: [ {'tweet.user.screen_name': { $regex: search , $options: 'i' }},{'tweet.user.name': { $regex: search , $options: 'i' }},{'tweet.created_at': { $regex: search , $options: 'i' }},{'tweet.entities.hashtags.text': { $regex: search , $options: 'i' }}, {'tweet.text': { $regex: search , $options: 'i' }} ] }).sort({'tweet.retweet_count' : -1}).limit(20).toArray(function(err, tweets) {
						if (err)
							console.log('Error searching for user: "'+search+'"');
						else
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, hashtags)
									        {
												if (err)
													console.log('Error at distinct');
												else{
													console.log(tweets.length);
													res.render(path, {usr:req.session.user.username, 'title': 'Twitter Feed' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort() ,'hashtags': hashtags.sort(),"searched":search,"url":hashtags_var});
													db.close();
												}
									        });
										}
							        });
					          	}
					        });
						}
					});
				}
				else if (order == 'dateDown')
				{
					db.collection('tweets').find({ 'tweet.entities.hashtags.text': {$in: hashtags_var} ,$or: [ {'tweet.user.screen_name': { $regex: search , $options: 'i' }},{'tweet.user.name': { $regex: search , $options: 'i' }},{'tweet.created_at': { $regex: search , $options: 'i' }},{'tweet.entities.hashtags.text': { $regex: search , $options: 'i' }}, {'tweet.text': { $regex: search , $options: 'i' }} ] }).sort({'tweet.id' : 1}).limit(20).toArray(function(err, tweets) {
						if (err)
							console.log('Error searching for user: "'+search+'"');
						else
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, hashtags)
									        {
												if (err)
													console.log('Error at distinct');
												else{
													console.log(tweets.length);
													res.render(path, {usr:req.session.user.username, 'title': 'Twitter Feed' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort() ,'hashtags': hashtags.sort(),"searched":search,"url":hashtags_var});
													db.close();
												}
									        });
										}
							        });
					          	}
					        });
						}
					});
				}
				else
				{
					db.collection('tweets').find({ 'tweet.entities.hashtags.text': {$in: hashtags_var} ,$or: [ {'tweet.user.screen_name': { $regex: search , $options: 'i' }},{'tweet.user.name': { $regex: search , $options: 'i' }},{'tweet.created_at': { $regex: search , $options: 'i' }},{'tweet.entities.hashtags.text': { $regex: search , $options: 'i' }}, {'tweet.text': { $regex: search , $options: 'i' }} ] }).sort({'tweet.id' : -1}).limit(20).toArray(function(err, tweets) {
						if (err)
							console.log('Error searching for user: "'+search+'"');
						else
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, hashtags)
									        {
												if (err)
													console.log('Error at distinct');
												else{
													console.log(tweets.length);
													res.render(path, {usr:req.session.user.username, 'title': 'Twitter Feed' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort() ,'hashtags': hashtags.sort(),"searched":search,"url":hashtags_var});
													db.close();
												}
									        });
										}
							        });
					          	}
					        });
						}
					});
				}
			}
			if ((users=='')&(hashtags!='')&(date!=''))	//011
			{
				var backupDate = date;
				date = dateToDate(date);
				var hashtags_var;
				hashtags_var = hashtags.split(",");
				if (order == 'favorites')
				{
					db.collection('tweets').find({'tweet.created_at': { $regex: date , $options: 'i' }, 'tweet.entities.hashtags.text': {$in: hashtags_var} ,$or: [ {'tweet.user.screen_name': { $regex: search , $options: 'i' }},{'tweet.user.name': { $regex: search , $options: 'i' }},{'tweet.created_at': { $regex: search , $options: 'i' }},{'tweet.entities.hashtags.text': { $regex: search , $options: 'i' }}, {'tweet.text': { $regex: search , $options: 'i' }} ] }).sort({'tweet.favorite_count' : -1}).limit(20).toArray(function(err, tweets) {
						if (err)
							console.log('Error searching for user: "'+search+'"');
						else
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, hashtags)
									        {
												if (err)
													console.log('Error at distinct');
												else{
													console.log(tweets.length);
													res.render(path, {usr:req.session.user.username, 'title': 'Twitter Feed' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort() ,'hashtags': hashtags.sort(),"searched":search,"url":hashtags_var,"date":backupDate});
													db.close();
												}
									        });
										}
							        });
					          	}
					        });
						}
					});
				}
				else if (order == 'retweets')
				{
					db.collection('tweets').find({'tweet.created_at': { $regex: date , $options: 'i' }, 'tweet.entities.hashtags.text': {$in: hashtags_var} ,$or: [ {'tweet.user.screen_name': { $regex: search , $options: 'i' }},{'tweet.user.name': { $regex: search , $options: 'i' }},{'tweet.created_at': { $regex: search , $options: 'i' }},{'tweet.entities.hashtags.text': { $regex: search , $options: 'i' }}, {'tweet.text': { $regex: search , $options: 'i' }} ] }).sort({'tweet.retweet_count' : -1}).limit(20).toArray(function(err, tweets) {
						if (err)
							console.log('Error searching for user: "'+search+'"');
						else
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, hashtags)
									        {
												if (err)
													console.log('Error at distinct');
												else{
													console.log(tweets.length);
													res.render(path, {usr:req.session.user.username, 'title': 'Twitter Feed' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort() ,'hashtags': hashtags.sort(),"searched":search,"url":hashtags_var,"date":backupDate});
													db.close();
												}
									        });
										}
							        });
					          	}
					        });
						}
					});
				}
				else if (order == 'dateDown')
				{
					db.collection('tweets').find({'tweet.created_at': { $regex: date , $options: 'i' }, 'tweet.entities.hashtags.text': {$in: hashtags_var} ,$or: [ {'tweet.user.screen_name': { $regex: search , $options: 'i' }},{'tweet.user.name': { $regex: search , $options: 'i' }},{'tweet.created_at': { $regex: search , $options: 'i' }},{'tweet.entities.hashtags.text': { $regex: search , $options: 'i' }}, {'tweet.text': { $regex: search , $options: 'i' }} ] }).sort({'tweet.id' : 1}).limit(20).toArray(function(err, tweets) {
						if (err)
							console.log('Error searching for user: "'+search+'"');
						else
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, hashtags)
									        {
												if (err)
													console.log('Error at distinct');
												else{
													console.log(tweets.length);
													res.render(path, {usr:req.session.user.username, 'title': 'Twitter Feed' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort() ,'hashtags': hashtags.sort(),"searched":search,"url":hashtags_var,"date":backupDate});
													db.close();
												}
									        });
										}
							        });
					          	}
					        });
						}
					});
				}
				else
				{
					db.collection('tweets').find({'tweet.created_at': { $regex: date , $options: 'i' }, 'tweet.entities.hashtags.text': {$in: hashtags_var} ,$or: [ {'tweet.user.screen_name': { $regex: search , $options: 'i' }},{'tweet.user.name': { $regex: search , $options: 'i' }},{'tweet.created_at': { $regex: search , $options: 'i' }},{'tweet.entities.hashtags.text': { $regex: search , $options: 'i' }}, {'tweet.text': { $regex: search , $options: 'i' }} ] }).sort({'tweet.id' : -1}).limit(20).toArray(function(err, tweets) {
						if (err)
							console.log('Error searching for user: "'+search+'"');
						else
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, hashtags)
									        {
												if (err)
													console.log('Error at distinct');
												else{
													console.log(tweets.length);
													res.render(path, {usr:req.session.user.username, 'title': 'Twitter Feed' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort() ,'hashtags': hashtags.sort(),"searched":search,"url":hashtags_var,"date":backupDate});
													db.close();
												}
									        });
										}
							        });
					          	}
					        });
						}
					});
				}
			}
			if ((users!='')&(hashtags=='')&(date==''))	//100
			{
				var usrs = users.split(",");
				if (order == 'favorites')
				{
					db.collection('tweets').find({ 'tweet.user.screen_name': {$in: usrs} ,$or: [ {'tweet.user.screen_name': { $regex: search , $options: 'i' }},{'tweet.user.name': { $regex: search , $options: 'i' }},{'tweet.created_at': { $regex: search , $options: 'i' }},{'tweet.entities.hashtags.text': { $regex: search , $options: 'i' }}, {'tweet.text': { $regex: search , $options: 'i' }} ] }).sort({'tweet.favorite_count' : -1}).limit(20).toArray(function(err, tweets) {
						if (err)
							console.log('Error searching for user: "'+search+'"');
						else
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, hashtags)
									        {
												if (err)
													console.log('Error at distinct');
												else{
													console.log(tweets.length);
													res.render(path, {usr:req.session.user.username, 'title': 'Twitter Feed' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'user': users , 'users': users_returned.sort() ,'hashtags': hashtags.sort(),"searched":search,"url":hashtags_var});
													db.close();
												}
									        });
										}
							        });
					          	}
					        });
						}
					});
				}
				else if (order == 'retweets')
				{
					db.collection('tweets').find({ 'tweet.user.screen_name': {$in: usrs} ,$or: [ {'tweet.user.screen_name': { $regex: search , $options: 'i' }},{'tweet.user.name': { $regex: search , $options: 'i' }},{'tweet.created_at': { $regex: search , $options: 'i' }},{'tweet.entities.hashtags.text': { $regex: search , $options: 'i' }}, {'tweet.text': { $regex: search , $options: 'i' }} ] }).sort({'tweet.retweet_count' : -1}).limit(20).toArray(function(err, tweets) {
						if (err)
							console.log('Error searching for user: "'+search+'"');
						else
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, hashtags)
									        {
												if (err)
													console.log('Error at distinct');
												else{
													console.log(tweets.length);
													res.render(path, {usr:req.session.user.username, 'title': 'Twitter Feed' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'user': users , 'users': users_returned.sort() ,'hashtags': hashtags.sort(),"searched":search,"url":hashtags_var});
													db.close();
												}
									        });
										}
							        });
					          	}
					        });
						}
					});
				}
				else if (order == 'dateDown')
				{
					db.collection('tweets').find({ 'tweet.user.screen_name': {$in: usrs} ,$or: [ {'tweet.user.screen_name': { $regex: search , $options: 'i' }},{'tweet.user.name': { $regex: search , $options: 'i' }},{'tweet.created_at': { $regex: search , $options: 'i' }},{'tweet.entities.hashtags.text': { $regex: search , $options: 'i' }}, {'tweet.text': { $regex: search , $options: 'i' }} ] }).sort({'tweet.id' : 1}).limit(20).toArray(function(err, tweets) {
						if (err)
							console.log('Error searching for user: "'+search+'"');
						else
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, hashtags)
									        {
												if (err)
													console.log('Error at distinct');
												else{
													console.log(tweets.length);
													res.render(path, {usr:req.session.user.username, 'title': 'Twitter Feed' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'user': users , 'users': users_returned.sort() ,'hashtags': hashtags.sort(),"searched":search,"url":hashtags_var});
													db.close();
												}
									        });
										}
							        });
					          	}
					        });
						}
					});
				}
				else
				{
					db.collection('tweets').find({ 'tweet.user.screen_name': {$in: usrs} ,$or: [ {'tweet.user.screen_name': { $regex: search , $options: 'i' }},{'tweet.user.name': { $regex: search , $options: 'i' }},{'tweet.created_at': { $regex: search , $options: 'i' }},{'tweet.entities.hashtags.text': { $regex: search , $options: 'i' }}, {'tweet.text': { $regex: search , $options: 'i' }} ] }).sort({'tweet.id' : -1}).limit(20).toArray(function(err, tweets) {
						if (err)
							console.log('Error searching for user: "'+search+'"');
						else
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, hashtags)
									        {
												if (err)
													console.log('Error at distinct');
												else{
													console.log(tweets.length);
													res.render(path, {usr:req.session.user.username, 'title': 'Twitter Feed' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'user': users , 'users': users_returned.sort() ,'hashtags': hashtags.sort(),"searched":search,"url":hashtags_var});
													db.close();
												}
									        });
										}
							        });
					          	}
					        });
						}
					});
				}
			}
			if ((users!='')&(hashtags=='')&(date!=''))	//101
			{
				var backupDate = date;
				date = dateToDate(date);
				var usrs = users.split(",");
				if (order == 'favorites')
				{
					db.collection('tweets').find({'tweet.created_at': { $regex: date , $options: 'i' }, 'tweet.user.screen_name': {$in: usrs} ,$or: [ {'tweet.user.screen_name': { $regex: search , $options: 'i' }},{'tweet.user.name': { $regex: search , $options: 'i' }},{'tweet.created_at': { $regex: search , $options: 'i' }},{'tweet.entities.hashtags.text': { $regex: search , $options: 'i' }}, {'tweet.text': { $regex: search , $options: 'i' }} ] }).sort({'tweet.favorite_count' : -1}).limit(20).toArray(function(err, tweets) {
						if (err)
							console.log('Error searching for user: "'+search+'"');
						else
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, hashtags)
									        {
												if (err)
													console.log('Error at distinct');
												else{
													console.log(tweets.length);
													res.render(path, {usr:req.session.user.username, 'title': 'users' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'user': users , 'users': users_returned.sort() ,'hashtags': hashtags.sort(),"searched":search,"url":hashtags_var,"date":backupDate});
													db.close();
												}
									        });
										}
							        });
					          	}
					        });
						}
					});
				}
				else if (order == 'retweets')
				{
					db.collection('tweets').find({'tweet.created_at': { $regex: date , $options: 'i' }, 'tweet.user.screen_name': {$in: usrs} ,$or: [ {'tweet.user.screen_name': { $regex: search , $options: 'i' }},{'tweet.user.name': { $regex: search , $options: 'i' }},{'tweet.created_at': { $regex: search , $options: 'i' }},{'tweet.entities.hashtags.text': { $regex: search , $options: 'i' }}, {'tweet.text': { $regex: search , $options: 'i' }} ] }).sort({'tweet.retweet_count' : -1}).limit(20).toArray(function(err, tweets) {
						if (err)
							console.log('Error searching for user: "'+search+'"');
						else
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, hashtags)
									        {
												if (err)
													console.log('Error at distinct');
												else{
													console.log(tweets.length);
													res.render(path, {usr:req.session.user.username, 'title': 'users' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'user': users , 'users': users_returned.sort() ,'hashtags': hashtags.sort(),"searched":search,"url":hashtags_var,"date":backupDate});
													db.close();
												}
									        });
										}
							        });
					          	}
					        });
						}
					});
				}
				else if (order == 'dateDown')
				{
					db.collection('tweets').find({'tweet.created_at': { $regex: date , $options: 'i' }, 'tweet.user.screen_name': {$in: usrs} ,$or: [ {'tweet.user.screen_name': { $regex: search , $options: 'i' }},{'tweet.user.name': { $regex: search , $options: 'i' }},{'tweet.created_at': { $regex: search , $options: 'i' }},{'tweet.entities.hashtags.text': { $regex: search , $options: 'i' }}, {'tweet.text': { $regex: search , $options: 'i' }} ] }).sort({'tweet.id' : 1}).limit(20).toArray(function(err, tweets) {
						if (err)
							console.log('Error searching for user: "'+search+'"');
						else
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, hashtags)
									        {
												if (err)
													console.log('Error at distinct');
												else{
													console.log(tweets.length);
													res.render(path, {usr:req.session.user.username, 'title': 'Twitter Feed' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'user': users , 'users': users_returned.sort() ,'hashtags': hashtags.sort(),"searched":search,"url":hashtags_var,"date":backupDate});
													db.close();
												}
									        });
										}
							        });
					          	}
					        });
						}
					});
				}
				else
				{
					db.collection('tweets').find({'tweet.created_at': { $regex: date , $options: 'i' }, 'tweet.user.screen_name': {$in: usrs} ,$or: [ {'tweet.user.screen_name': { $regex: search , $options: 'i' }},{'tweet.user.name': { $regex: search , $options: 'i' }},{'tweet.created_at': { $regex: search , $options: 'i' }},{'tweet.entities.hashtags.text': { $regex: search , $options: 'i' }}, {'tweet.text': { $regex: search , $options: 'i' }} ] }).sort({'tweet.id' : -1}).limit(20).toArray(function(err, tweets) {
						if (err)
							console.log('Error searching for user: "'+search+'"');
						else
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, hashtags)
									        {
												if (err)
													console.log('Error at distinct');
												else{
													console.log(tweets.length);
													res.render(path, {usr:req.session.user.username, 'title': 'Twitter Feed' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'user': users , 'users': users_returned.sort() ,'hashtags': hashtags.sort(),"searched":search,"url":hashtags_var,"date":backupDate});
													db.close();
												}
									        });
										}
							        });
					          	}
					        });
						}
					});
				}
			}
			if ((users!='')&(hashtags!='')&(date==''))	//110
			{
				var usrs,hashtags_var;
				if (users.length == 1)
					usrs = users;
				else
					usrs = users.split(",");
				if (hashtags.length == 1)
					hashtags_var = hashtags;
				else
					hashtags_var = hashtags.split(",");
				if (order == 'favorites')
				{
					db.collection('tweets').find({ 'tweet.user.screen_name': {$in: usrs} ,'tweet.entities.hashtags.text': {$in: hashtags_var} ,$or: [ {'tweet.user.screen_name': { $regex: search , $options: 'i' }},{'tweet.user.name': { $regex: search , $options: 'i' }},{'tweet.created_at': { $regex: search , $options: 'i' }},{'tweet.entities.hashtags.text': { $regex: search , $options: 'i' }}, {'tweet.text': { $regex: search , $options: 'i' }} ] }).sort({'tweet.favorite_count' : -1}).limit(20).toArray(function(err, tweets) {
						if (err)
							console.log('Error searching for user: "'+search+'"');
						else
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, hashtags)
									        {
												if (err)
													console.log('Error at distinct');
												else{
													console.log(tweets.length);
													res.render(path, {usr:req.session.user.username, 'title': 'Twitter Feed' , tweet_data: tweets , 'load_options':  filter_options.sort() ,'user': users , 'users': users_returned.sort() ,'hashtags': hashtags.sort(),"searched":search,"url":hashtags_var});
													db.close();
												}
									        });
										}
							        });
					          	}
					        });
						}
					});
				}
				else if (order == 'retweets')
				{
					db.collection('tweets').find({ 'tweet.user.screen_name': {$in: usrs} ,'tweet.entities.hashtags.text': {$in: hashtags_var} ,$or: [ {'tweet.user.screen_name': { $regex: search , $options: 'i' }},{'tweet.user.name': { $regex: search , $options: 'i' }},{'tweet.created_at': { $regex: search , $options: 'i' }},{'tweet.entities.hashtags.text': { $regex: search , $options: 'i' }}, {'tweet.text': { $regex: search , $options: 'i' }} ] }).sort({'tweet.retweet_count' : -1}).limit(20).toArray(function(err, tweets) {
						if (err)
							console.log('Error searching for user: "'+search+'"');
						else
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, hashtags)
									        {
												if (err)
													console.log('Error at distinct');
												else{
													console.log(tweets.length);
													res.render(path, {usr:req.session.user.username, 'title': 'Twitter Feed' , tweet_data: tweets , 'load_options':  filter_options.sort() ,'user': users , 'users': users_returned.sort() ,'hashtags': hashtags.sort(),"searched":search,"url":hashtags_var});
													db.close();
												}
									        });
										}
							        });
					          	}
					        });
						}
					});
				}
				else if (order == 'dateDown')
				{
					db.collection('tweets').find({ 'tweet.user.screen_name': {$in: usrs} ,'tweet.entities.hashtags.text': {$in: hashtags_var} ,$or: [ {'tweet.user.screen_name': { $regex: search , $options: 'i' }},{'tweet.user.name': { $regex: search , $options: 'i' }},{'tweet.created_at': { $regex: search , $options: 'i' }},{'tweet.entities.hashtags.text': { $regex: search , $options: 'i' }}, {'tweet.text': { $regex: search , $options: 'i' }} ] }).sort({'tweet.id' : 1}).limit(20).toArray(function(err, tweets) {
						if (err)
							console.log('Error searching for user: "'+search+'"');
						else
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, hashtags)
									        {
												if (err)
													console.log('Error at distinct');
												else{
													console.log(tweets.length);
													res.render(path, {usr:req.session.user.username, 'title': 'Twitter Feed' , tweet_data: tweets , 'load_options':  filter_options.sort() ,'user': users , 'users': users_returned.sort() ,'hashtags': hashtags.sort(),"searched":search,"url":hashtags_var});
													db.close();
												}
									        });
										}
							        });
					          	}
					        });
						}
					});
				}
				else
				{
					db.collection('tweets').find({ 'tweet.user.screen_name': {$in: usrs} ,'tweet.entities.hashtags.text': {$in: hashtags_var} , $or: [ {'tweet.user.screen_name': { $regex: search , $options: 'i' }},{'tweet.user.name': { $regex: search , $options: 'i' }},{'tweet.created_at': { $regex: search , $options: 'i' }},{'tweet.entities.hashtags.text': { $regex: search , $options: 'i' }}, {'tweet.text': { $regex: search , $options: 'i' }} ] }).sort({'tweet.id' : -1}).limit(20).toArray(function(err, tweets) {
						if (err)
							console.log('Error searching for user: "'+usrs+'"'+','+hashtags_var);
						else
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, hashtags)
									        {
												if (err)
													console.log('Error at distinct');
												else{
													console.log(tweets.length);
													res.render(path, {usr:req.session.user.username, 'title': 'Twitter Feed' , tweet_data: tweets , 'load_options':  filter_options.sort() ,'user': users , 'users': users_returned.sort() ,'hashtags': hashtags.sort(),"searched":search,"url":hashtags_var});
													db.close();
												}
									        });
										}
							        });
					          	}
					        });
						}
					});
				}
			}
			if ((users!='')&(hashtags!='')&(date!=''))	//111
			{
				var usrs = users.split(",");
				var hashtags_var;
				hashtags_var = hashtags.split(",");
				var backupDate = date;
				date = dateToDate(date);
				if (order == 'favorites')
				{
					db.collection('tweets').find({ 'tweet.created_at': { $regex: date , $options: 'i' } , 'tweet.user.screen_name': {$in: usrs} ,'tweet.entities.hashtags.text': {$in: hashtags_var} ,$or: [ {'tweet.user.screen_name': { $regex: search , $options: 'i' }},{'tweet.user.name': { $regex: search , $options: 'i' }},{'tweet.created_at': { $regex: search , $options: 'i' }},{'tweet.entities.hashtags.text': { $regex: search , $options: 'i' }}, {'tweet.text': { $regex: search , $options: 'i' }} ] }).sort({'tweet.favorite_count' : -1}).limit(20).toArray(function(err, tweets) {
						if (err)
							console.log('Error searching for user: "'+search+'"');
						else
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, hashtags)
									        {
												if (err)
													console.log('Error at distinct');
												else{
													console.log(tweets.length);
													res.render(path, {usr:req.session.user.username, 'title': 'Twitter Feed' , tweet_data: tweets , 'load_options':  filter_options.sort() ,'user': users , 'users': users_returned.sort() ,'hashtags': hashtags.sort(),"searched":search,"url":hashtags_var,"date":backupDate});
													db.close();
												}
									        });
										}
							        });
					          	}
					        });
						}
					});
				}
				else if (order == 'retweets')
				{
					db.collection('tweets').find({ 'tweet.created_at': { $regex: date , $options: 'i' } , 'tweet.user.screen_name': {$in: usrs} ,'tweet.entities.hashtags.text': {$in: hashtags_var} ,$or: [ {'tweet.user.screen_name': { $regex: search , $options: 'i' }},{'tweet.user.name': { $regex: search , $options: 'i' }},{'tweet.created_at': { $regex: search , $options: 'i' }},{'tweet.entities.hashtags.text': { $regex: search , $options: 'i' }}, {'tweet.text': { $regex: search , $options: 'i' }} ] }).sort({'tweet.retweet_count' : -1}).limit(20).toArray(function(err, tweets) {
						if (err)
							console.log('Error searching for user: "'+search+'"');
						else
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, hashtags)
									        {
												if (err)
													console.log('Error at distinct');
												else{
													console.log(tweets.length);
													res.render(path, {usr:req.session.user.username, 'title': 'Twitter Feed' , tweet_data: tweets , 'load_options':  filter_options.sort() ,'user': users , 'users': users_returned.sort() ,'hashtags': hashtags.sort(),"searched":search,"url":hashtags_var,"date":backupDate});
													db.close();
												}
									        });
										}
							        });
					          	}
					        });
						}
					});
				}
				else if (order == 'dateDown')
				{
					db.collection('tweets').find({ 'tweet.created_at': { $regex: date , $options: 'i' } , 'tweet.user.screen_name': {$in: usrs} ,'tweet.entities.hashtags.text': {$in: hashtags_var} ,$or: [ {'tweet.user.screen_name': { $regex: search , $options: 'i' }},{'tweet.user.name': { $regex: search , $options: 'i' }},{'tweet.created_at': { $regex: search , $options: 'i' }},{'tweet.entities.hashtags.text': { $regex: search , $options: 'i' }}, {'tweet.text': { $regex: search , $options: 'i' }} ] }).sort({'tweet.id' : 1}).limit(20).toArray(function(err, tweets) {
						if (err)
							console.log('Error searching for user: "'+search+'"');
						else
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, hashtags)
									        {
												if (err)
													console.log('Error at distinct');
												else{
													console.log(tweets.length);
													res.render(path, {usr:req.session.user.username, 'title': 'Twitter Feed' , tweet_data: tweets , 'load_options':  filter_options.sort() ,'user': users , 'users': users_returned.sort() ,'hashtags': hashtags.sort(),"searched":search,"url":hashtags_var,"date":backupDate});
													db.close();
												}
									        });
										}
							        });
					          	}
					        });
						}
					});
				}
				else
				{
					db.collection('tweets').find({ 'tweet.created_at': { $regex: date , $options: 'i' } , 'tweet.user.screen_name': {$in: usrs} ,'tweet.entities.hashtags.text': {$in: hashtags_var} ,$or: [ {'tweet.user.screen_name': { $regex: search , $options: 'i' }},{'tweet.user.name': { $regex: search , $options: 'i' }},{'tweet.created_at': { $regex: search , $options: 'i' }},{'tweet.entities.hashtags.text': { $regex: search , $options: 'i' }}, {'tweet.text': { $regex: search , $options: 'i' }} ] }).sort({'tweet.id' : -1}).limit(20).toArray(function(err, tweets) {
						if (err)
							console.log('Error searching for user: "'+search+'"');
						else
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, hashtags)
									        {
												if (err)
													console.log('Error at distinct');
												else{
													console.log(tweets.length);
													res.render(path, {usr:req.session.user.username, 'title': 'Twitter Feed' , tweet_data: tweets , 'load_options':  filter_options.sort() ,'user': users , 'users': users_returned.sort() ,'hashtags': hashtags.sort(),"searched":search,"url":hashtags_var,"date":backupDate});
													db.close();
												}
									        });
										}
							        });
					          	}
					        });
						}
					});
				}
			}
		}
	});
}

function dateToDate(input){

	var date = input.split('/');
	var day  = date[0];
	var year = date[2];

	var month;
	
	if ((date[1] == '1')||(date[1] == '01'))
		month = 'Jan';
	else if ((date[1] == '2')||(date[1] == '02'))
		month = 'Feb';
	else if ((date[1] == '3')||(date[1] == '03'))
		month = 'Mar';
	else if ((date[1] == '4')||(date[1] == '04'))
		month = 'Apr';
	else if ((date[1] == '5')||(date[1] == '05'))
		month = 'May';
	else if ((date[1] == '6')||(date[1] == '06'))
		month = 'Jun';
	else if ((date[1] == '7')||(date[1] == '07'))
		month = 'Jul';
	else if ((date[1] == '8')||(date[1] == '08'))
		month = 'Aug';
	else if ((date[1] == '9')||(date[1] == '09'))
		month = 'Sep';
	else if ((date[1] == '10')||(date[1] == '010'))
		month = 'Oct';
	else if ((date[1] == '11')||(date[1] == '011'))
		month = 'Nov';
	else if ((date[1] == '12')||(date[1] == '012'))
		month = 'Dec';

	var output = month+' '+day+' '+year;
	return output;
}