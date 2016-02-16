var express         = require('express');

module.exports = function (users,hashtag,date,res,path,order)
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
			db.close();
		} 
		else 
		{
			if (date=='')
			{
				if ((users != '')&&(hashtag == ''))
				{
					if (order == 'favorites'){
						db.collection('tweets').find({'tweet.user.screen_name': {$in: usrs}}).sort({'tweet.favorite_count' : -1}).limit(20).toArray(function(err, tweets) {
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, fhashtags)
									        {
												if (err){
													console.log('Error at distinct');
													db.close();
												}
												else{
													res.render(path, { 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort(), 'user': users ,'hashtags': fhashtags.sort() , 'url': hashtags,'date':''});
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
						db.collection('tweets').find({'tweet.user.screen_name': {$in: usrs}}).sort({'tweet.retweet_count' : -1}).limit(20).toArray(function(err, tweets) {
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, fhashtags)
									        {
												if (err){
													console.log('Error at distinct');
													db.close();
												}
												else{
													res.render(path, { 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort(), 'user': users ,'hashtags': fhashtags.sort() , 'url': hashtags,'date':''});
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
						db.collection('tweets').find({'tweet.user.screen_name': {$in: usrs}}).sort({'tweet.id' : 1}).limit(20).toArray(function(err, tweets) {
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, fhashtags)
									        {
												if (err){
													console.log('Error at distinct');
													db.close();
												}
												else{
													res.render(path, { 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort(), 'user': users ,'hashtags': fhashtags.sort() , 'url': hashtags,'date':''});
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
						db.collection('tweets').find({'tweet.user.screen_name': {$in: usrs}}).sort({'tweet.id' : -1}).limit(20).toArray(function(err, tweets) {
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, fhashtags)
									        {
												if (err){
													console.log('Error at distinct');
													db.close();
												}
												else{
													res.render(path, { 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort(), 'user': users ,'hashtags': fhashtags.sort() , 'url': hashtags,'date':''});
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
				else if ((users == '')&&(hashtag != ''))
				{
					if (order == 'favorites')
					{
						db.collection('tweets').find({'tweet.entities.hashtags.text': {$in: hashtags}}).sort({'tweet.favorite_count' : -1}).limit(20).toArray(function(err, tweets) {
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, fhashtags)
									        {
												if (err){
													console.log('Error at distinct');
													db.close();
												}
												else{
													res.render(path, { 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort(), 'user': users ,'hashtags': fhashtags.sort() , 'url': hashtags,'date':''});
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
						db.collection('tweets').find({'tweet.entities.hashtags.text': {$in: hashtags}}).sort({'tweet.retweet_count' : -1}).limit(20).toArray(function(err, tweets) {
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, fhashtags)
									        {
												if (err){
													console.log('Error at distinct');
													db.close();
												}
												else{
													res.render(path, { 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort(), 'user': users ,'hashtags': fhashtags.sort() , 'url': hashtags,'date':''});
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
						db.collection('tweets').find({'tweet.entities.hashtags.text': {$in: hashtags}}).sort({'tweet.id' : 1}).limit(20).toArray(function(err, tweets) {
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, fhashtags)
									        {
												if (err){
													console.log('Error at distinct');
													db.close();
												}
												else{
													res.render(path, { 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort(), 'user': users ,'hashtags': fhashtags.sort() , 'url': hashtags,'date':''});
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
						db.collection('tweets').find({'tweet.entities.hashtags.text': {$in: hashtags}}).sort({'tweet.id' : -1}).limit(20).toArray(function(err, tweets) {
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, fhashtags)
									        {
												if (err){
													console.log('Error at distinct');
													db.close();
												}
												else{
													res.render(path, { 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort(), 'user': users ,'hashtags': fhashtags.sort() , 'url': hashtags,'date':''});
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
						db.collection('tweets').find({'tweet.entities.hashtags.text': {$in: hashtags},'tweet.user.screen_name': {$in: usrs}}).sort({'tweet.favorite_count' : -1}).limit(20).toArray(function(err, tweets) {
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, fhashtags)
									        {
												if (err){
													console.log('Error at distinct');
													db.close();
												}
												else{
													res.render(path, { 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort(), 'user': users ,'hashtags': fhashtags.sort() , 'url': hashtags,'date':''});
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
						db.collection('tweets').find({'tweet.entities.hashtags.text': {$in: hashtags},'tweet.user.screen_name': {$in: usrs}}).sort({'tweet.retweet_count' : -1}).limit(20).toArray(function(err, tweets) {
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, fhashtags)
									        {
												if (err){
													console.log('Error at distinct');
													db.close();
												}
												else{
													res.render(path, { 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort(), 'user': users ,'hashtags': fhashtags.sort() , 'url': hashtags,'date':''});
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
						db.collection('tweets').find({'tweet.entities.hashtags.text': {$in: hashtags},'tweet.user.screen_name': {$in: usrs}}).sort({'tweet.id' : 1}).limit(20).toArray(function(err, tweets) {
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, fhashtags)
									        {
												if (err){
													console.log('Error at distinct');
													db.close();
												}
												else{
													res.render(path, { 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort(), 'user': users ,'hashtags': fhashtags.sort() , 'url': hashtags,'date':''});
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
						db.collection('tweets').find({'tweet.entities.hashtags.text': {$in: hashtags},'tweet.user.screen_name': {$in: usrs}}).sort({'tweet.id' : -1}).limit(20).toArray(function(err, tweets) {
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, fhashtags)
									        {
												if (err){
													console.log('Error at distinct');
													db.close();
												}
												else{
													res.render(path, { 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort(), 'user': users ,'hashtags': fhashtags.sort() , 'url': hashtags,'date':''});
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
			else
			{
				var backupDate = date;
				date = dateToDate(date);
				if ((users != '')&&(hashtag == ''))
				{
					if (order == 'favorites')
					{
						db.collection('tweets').find({'tweet.user.screen_name': {$in: usrs},'tweet.created_at': { $regex: date , $options: 'i' }}).sort({'tweet.favorite_count' : -1}).limit(20).toArray(function(err, tweets) {
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, fhashtags)
									        {
												if (err){
													console.log('Error at distinct');
													db.close();
												}
												else{
													res.render(path, { 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort(), 'user': users ,'hashtags': fhashtags.sort() , 'url': hashtags, 'date':backupDate});
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
						db.collection('tweets').find({'tweet.user.screen_name': {$in: usrs},'tweet.created_at': { $regex: date , $options: 'i' }}).sort({'tweet.retweet_count' : -1}).limit(20).toArray(function(err, tweets) {
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, fhashtags)
									        {
												if (err){
													console.log('Error at distinct');
													db.close();
												}
												else{
													res.render(path, { 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort(), 'user': users ,'hashtags': fhashtags.sort() , 'url': hashtags, 'date':backupDate});
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
						db.collection('tweets').find({'tweet.user.screen_name': {$in: usrs},'tweet.created_at': { $regex: date , $options: 'i' }}).sort({'tweet.id' : 1}).limit(20).toArray(function(err, tweets) {
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, fhashtags)
									        {
												if (err){
													console.log('Error at distinct');
													db.close();
												}
												else{
													res.render(path, { 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort(), 'user': users ,'hashtags': fhashtags.sort() , 'url': hashtags, 'date':backupDate});
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
						db.collection('tweets').find({'tweet.user.screen_name': {$in: usrs},'tweet.created_at': { $regex: date , $options: 'i' }}).sort({'tweet.id' : -1}).limit(20).toArray(function(err, tweets) {
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, fhashtags)
									        {
												if (err){
													console.log('Error at distinct');
													db.close();
												}
												else{
													res.render(path, { 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort(), 'user': users ,'hashtags': fhashtags.sort() , 'url': hashtags, 'date':backupDate});
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
				else if ((users == '')&&(hashtag != ''))
				{
					if (order == 'favorites')
					{
						db.collection('tweets').find({'tweet.entities.hashtags.text': {$in: hashtags},'tweet.created_at': { $regex: date , $options: 'i' }}).sort({'tweet.favorite_count' : -1}).limit(20).toArray(function(err, tweets) {
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, fhashtags)
									        {
												if (err){
													console.log('Error at distinct');
													db.close();
												}
												else{
													res.render(path, { 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort(), 'user': users ,'hashtags': fhashtags.sort() , 'url': hashtags,'date':backupDate});
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
						db.collection('tweets').find({'tweet.entities.hashtags.text': {$in: hashtags},'tweet.created_at': { $regex: date , $options: 'i' }}).sort({'tweet.retweet_count' : -1}).limit(20).toArray(function(err, tweets) {
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, fhashtags)
									        {
												if (err){
													console.log('Error at distinct');
													db.close();
												}
												else{
													res.render(path, { 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort(), 'user': users ,'hashtags': fhashtags.sort() , 'url': hashtags,'date':backupDate});
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
						db.collection('tweets').find({'tweet.entities.hashtags.text': {$in: hashtags},'tweet.created_at': { $regex: date , $options: 'i' }}).sort({'tweet.id' : 1}).limit(20).toArray(function(err, tweets) {
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, fhashtags)
									        {
												if (err){
													console.log('Error at distinct');
													db.close();
												}
												else{
													res.render(path, { 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort(), 'user': users ,'hashtags': fhashtags.sort() , 'url': hashtags,'date':backupDate});
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
						db.collection('tweets').find({'tweet.entities.hashtags.text': {$in: hashtags},'tweet.created_at': { $regex: date , $options: 'i' }}).sort({'tweet.id' : -1}).limit(20).toArray(function(err, tweets) {
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, fhashtags)
									        {
												if (err){
													console.log('Error at distinct');
													db.close();
												}
												else{
													res.render(path, { 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort(), 'user': users ,'hashtags': fhashtags.sort() , 'url': hashtags,'date':backupDate});
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
				else if ((users == '')&&(hashtag == ''))
				{
					if (order == 'favorites')
					{
						db.collection('tweets').find({'tweet.created_at': { $regex: date , $options: 'i' }}).sort({'tweet.favorite_count' : -1}).limit(20).toArray(function(err, tweets) {
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, fhashtags)
									        {
												if (err){
													console.log('Error at distinct');
													db.close();
												}
												else{
													res.render(path, { 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort(), 'user': users ,'hashtags': fhashtags.sort() , 'url': hashtags,'date':backupDate});
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
						db.collection('tweets').find({'tweet.created_at': { $regex: date , $options: 'i' }}).sort({'tweet.retweet_count' : -1}).limit(20).toArray(function(err, tweets) {
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, fhashtags)
									        {
												if (err){
													console.log('Error at distinct');
													db.close();
												}
												else{
													res.render(path, { 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort(), 'user': users ,'hashtags': fhashtags.sort() , 'url': hashtags,'date':backupDate});
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
						db.collection('tweets').find({'tweet.created_at': { $regex: date , $options: 'i' }}).sort({'tweet.id' : 1}).limit(20).toArray(function(err, tweets) {
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, fhashtags)
									        {
												if (err){
													console.log('Error at distinct');
													db.close();
												}
												else{
													res.render(path, { 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort(), 'user': users ,'hashtags': fhashtags.sort() , 'url': hashtags,'date':backupDate});
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
						db.collection('tweets').find({'tweet.created_at': { $regex: date , $options: 'i' }}).sort({'tweet.id' : -1}).limit(20).toArray(function(err, tweets) {
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, fhashtags)
									        {
												if (err){
													console.log('Error at distinct');
													db.close();
												}
												else{
													res.render(path, { 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort(), 'user': users ,'hashtags': fhashtags.sort() , 'url': hashtags,'date':backupDate});
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
						db.collection('tweets').find({'tweet.entities.hashtags.text': {$in: hashtags},'tweet.user.screen_name': {$in: usrs},'tweet.created_at': { $regex: date , $options: 'i' }}).sort({'tweet.favorite_count' : -1}).limit(20).toArray(function(err, tweets) {
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, fhashtags)
									        {
												if (err){
													console.log('Error at distinct');
													db.close();
												}
												else{
													res.render(path, { 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort(), 'user': users ,'hashtags': fhashtags.sort() , 'url': hashtags,'date':backupDate});
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
						db.collection('tweets').find({'tweet.entities.hashtags.text': {$in: hashtags},'tweet.user.screen_name': {$in: usrs},'tweet.created_at': { $regex: date , $options: 'i' }}).sort({'tweet.retweet_count' : -1}).limit(20).toArray(function(err, tweets) {
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, fhashtags)
									        {
												if (err){
													console.log('Error at distinct');
													db.close();
												}
												else{
													res.render(path, { 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort(), 'user': users ,'hashtags': fhashtags.sort() , 'url': hashtags,'date':backupDate});
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
						db.collection('tweets').find({'tweet.entities.hashtags.text': {$in: hashtags},'tweet.user.screen_name': {$in: usrs},'tweet.created_at': { $regex: date , $options: 'i' }}).sort({'tweet.id' : 1}).limit(20).toArray(function(err, tweets) {
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, fhashtags)
									        {
												if (err){
													console.log('Error at distinct');
													db.close();
												}
												else{
													res.render(path, { 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort(), 'user': users ,'hashtags': fhashtags.sort() , 'url': hashtags,'date':backupDate});
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
						db.collection('tweets').find({'tweet.entities.hashtags.text': {$in: hashtags},'tweet.user.screen_name': {$in: usrs},'tweet.created_at': { $regex: date , $options: 'i' }}).sort({'tweet.id' : -1}).limit(20).toArray(function(err, tweets) {
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
											db.collection('tweets').distinct( 'tweet.entities.hashtags.text'  ,function(err, fhashtags)
									        {
												if (err){
													console.log('Error at distinct');
													db.close();
												}
												else{
													res.render(path, { 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options.sort() , 'users': users_returned.sort(), 'user': users ,'hashtags': fhashtags.sort() , 'url': hashtags,'date':backupDate});
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