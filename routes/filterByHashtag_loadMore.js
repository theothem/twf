var express         = require('express');
var csrf            = require('csurf');
var session         = require('client-sessions'); 
var mysql           = require('mysql');

module.exports = function (users,hashtag,date,req,res,path,order,skip)
{	
	var hashtags;
	hashtags = hashtag.split(",");

	if ((skip == undefined) || (skip == null))
		skip = 0;

	var usrs = users.split(",");
	
	var hashtags;
	hashtags = hashtag.split(",");

	var connection = mysql.createConnection({
	    host     : 'localhost',
	    user     : 'root',
	    password : '741992',
	    database : 'twf'
	});
	
	connection.connect(function(err){
	    if(!err) {
	        //console.log("Database is connected ...");    
	    } else {
	        console.log("Error connecting database ...");  
	        return;  
	    }
	});	

	if (date=='')
	{
		if ((users == '')&&(hashtag == ''))
		{
			if (order == 'favorites')
			{
				connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?)'+' ORDER BY tweets.favorite_count DESC LIMIT 20 OFFSET '+skip, req.session.user.username ,function(err, tweets) 
				{
					if (err){
						console.log(err);
					}
					
					var tweets_to_send = tweets;
					for (var i=0;i<tweets_to_send.length;i++)
					{
						tweets_to_send[i].created_at = tweets_to_send[i].created_at.toString();
					}
					res.json(tweets_to_send);
					connection.end();
					return;
				});
			}
			else if (order == 'retweets')
			{
				connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?)'+' ORDER BY tweets.retweet_count DESC LIMIT 20 OFFSET '+skip, req.session.user.username ,function(err, tweets) 
				{
					if (err){
						console.log(err);
					}
					
					var tweets_to_send = tweets;
					for (var i=0;i<tweets_to_send.length;i++)
					{
						tweets_to_send[i].created_at = tweets_to_send[i].created_at.toString();
					}
					res.json(tweets_to_send);
					connection.end();
					return;
				});
			}
			else if (order == 'dateDown')
			{
				connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?)'+' ORDER BY tweets.created_at ASC LIMIT 20 OFFSET '+skip, req.session.user.username ,function(err, tweets) 
				{
					if (err){
						console.log(err);
					}
					
					var tweets_to_send = tweets;
					for (var i=0;i<tweets_to_send.length;i++)
					{
						tweets_to_send[i].created_at = tweets_to_send[i].created_at.toString();
					}
					res.json(tweets_to_send);
					connection.end();
					return;
				});
			}
			else
			{
				connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?)'+' ORDER BY tweets.created_at DESC LIMIT 20 OFFSET '+skip, req.session.user.username ,function(err, tweets) 
				{
					if (err){
						console.log(err);
					}
					
					var tweets_to_send = tweets;
					for (var i=0;i<tweets_to_send.length;i++)
					{
						tweets_to_send[i].created_at = tweets_to_send[i].created_at.toString();
					}
					res.json(tweets_to_send);
					connection.end();
					return;
				});
			}
		}
		else if ((users != '')&&(hashtag == ''))
		{
			if (order == 'favorites')
			{
				var usersBack = users;
				users = users.split(',');
				for (var i=0;i<users.length;i++)
				{
					users[i] = '\''+users[i]+'\'';
					if (i==users.length-1)
					{
						connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND tweets.user IN ('+users.toString()+') '+'ORDER BY tweets.favorite_count DESC LIMIT 20 OFFSET '+skip, req.session.user.username ,function(err, tweets) 
						{
							if (err){
								console.log(err);
							}
							
							var tweets_to_send = tweets;
							for (var i=0;i<tweets_to_send.length;i++)
							{
								tweets_to_send[i].created_at = tweets_to_send[i].created_at.toString();
							}
							res.json(tweets_to_send);
							connection.end();
							return;
						});
					}
				}	
			}
			else if (order == 'retweets')
			{
				var usersBack = users;
				users = users.split(',');
				for (var i=0;i<users.length;i++)
				{
					users[i] = '\''+users[i]+'\'';
					if (i==users.length-1)
					{
						connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND tweets.user IN ('+users.toString()+') '+'ORDER BY tweets.retweet_count DESC LIMIT 20 OFFSET '+skip, req.session.user.username ,function(err, tweets) 
						{
							if (err){
								console.log(err);
							}
							
							var tweets_to_send = tweets;
							for (var i=0;i<tweets_to_send.length;i++)
							{
								tweets_to_send[i].created_at = tweets_to_send[i].created_at.toString();
							}
							res.json(tweets_to_send);
							connection.end();
							return;
						});
					}
				}	
			}
			else if (order == 'dateDown')
			{
				var usersBack = users;
				users = users.split(',');
				for (var i=0;i<users.length;i++)
				{
					users[i] = '\''+users[i]+'\'';
					if (i==users.length-1)
					{
						connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND tweets.user IN ('+users.toString()+') '+'ORDER BY tweets.created_at ASC LIMIT 20 OFFSET '+skip, req.session.user.username ,function(err, tweets) 
						{
							if (err){
								console.log(err);
							}
							
							var tweets_to_send = tweets;
							for (var i=0;i<tweets_to_send.length;i++)
							{
								tweets_to_send[i].created_at = tweets_to_send[i].created_at.toString();
							}
							res.json(tweets_to_send);
							connection.end();
							return;
						});
					}
				}	
			}
			else
			{
				var usersBack = users;
				users = users.split(',');
				for (var i=0;i<users.length;i++)
				{
					users[i] = '\''+users[i]+'\'';
					if (i==users.length-1)
					{
						connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND tweets.user IN ('+users.toString()+') '+'ORDER BY tweets.created_at DESC LIMIT 20 OFFSET '+skip, req.session.user.username ,function(err, tweets) 
						{
							if (err){
								console.log(err);
							}
							
							var tweets_to_send = tweets;
							for (var i=0;i<tweets_to_send.length;i++)
							{
								tweets_to_send[i].created_at = tweets_to_send[i].created_at.toString();
							}
							res.json(tweets_to_send);
							connection.end();
							return;
						});
					}
				}	
			}
		}
		else if ((users == '')&&(hashtag != ''))
		{
			if (order == 'favorites')
			{
				for (var i=0;i<hashtags.length;i++)
				{
					hashtags[i] = '\''+hashtags[i]+'\'';
					if (i==hashtags.length-1)
					{
						connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND (tweets.id IN ( SELECT id FROM hashtags WHERE hashtags.hashtag IN ('+hashtags.toString()+'))) ORDER BY tweets.favorite_count DESC LIMIT 20 OFFSET '+skip, req.session.user.username ,function(err, tweets) 
						{
							if (err){
								console.log(err);
							}
							tweets_to_send = tweets;
							for (var i=0;i<tweets_to_send.length;i++)
							{
								tweets_to_send[i].created_at = tweets_to_send[i].created_at.toString();
							}
							res.json(tweets_to_send);
							connection.end();
							return;
						});
					}
				}
			}
			else if (order == 'retweets')
			{
				for (var i=0;i<hashtags.length;i++)
				{
					hashtags[i] = '\''+hashtags[i]+'\'';
					if (i==hashtags.length-1)
					{
						connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND (tweets.id IN ( SELECT id FROM hashtags WHERE hashtags.hashtag IN ('+hashtags.toString()+'))) ORDER BY tweets.retweet_count DESC LIMIT 20 OFFSET '+skip, req.session.user.username ,function(err, tweets) 
						{
							if (err){
								console.log(err);
							}
							tweets_to_send = tweets;
							for (var i=0;i<tweets_to_send.length;i++)
							{
								tweets_to_send[i].created_at = tweets_to_send[i].created_at.toString();
							}
							res.json(tweets_to_send);
							connection.end();
							return;
						});
					}
				}
			}
			else if (order == 'dateDown')
			{
				for (var i=0;i<hashtags.length;i++)
				{
					hashtags[i] = '\''+hashtags[i]+'\'';
					if (i==hashtags.length-1)
					{
						connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND (tweets.id IN ( SELECT id FROM hashtags WHERE hashtags.hashtag IN ('+hashtags.toString()+'))) ORDER BY tweets.created_at ASC LIMIT 20 OFFSET '+skip, req.session.user.username ,function(err, tweets) 
						{
							if (err){
								console.log(err);
							}
							tweets_to_send = tweets;
							for (var i=0;i<tweets_to_send.length;i++)
							{
								tweets_to_send[i].created_at = tweets_to_send[i].created_at.toString();
							}
							res.json(tweets_to_send);
							connection.end();
							return;
						});
					}
				}
			}
			else
			{
				for (var i=0;i<hashtags.length;i++)
				{
					hashtags[i] = '\''+hashtags[i]+'\'';
					if (i==hashtags.length-1)
					{
						connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND (tweets.id IN ( SELECT id FROM hashtags WHERE hashtags.hashtag IN ('+hashtags.toString()+'))) ORDER BY tweets.created_at DESC LIMIT 20 OFFSET '+skip, req.session.user.username ,function(err, tweets) 
						{
							if (err){
								console.log(err);
							}
							tweets_to_send = tweets;
							for (var i=0;i<tweets_to_send.length;i++)
							{
								tweets_to_send[i].created_at = tweets_to_send[i].created_at.toString();
							}
							res.json(tweets_to_send);
							connection.end();
							return;
						});
					}
				}
			}
		}
		else
		{
			if (order == 'favorites')
			{
				var usersBack = users;
				users = users.split(',');
				for (var i=0;i<users.length;i++)
				{
					users[i] = '\''+users[i]+'\'';
					if (i==users.length-1)
					{
						for (var i=0;i<hashtags.length;i++)
						{
							hashtags[i] = '\''+hashtags[i]+'\'';
							if (i==hashtags.length-1)
							{
								connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND (tweets.user IN ('+users.toString()+')'+') AND (tweets.id IN ( SELECT id FROM hashtags WHERE hashtags.hashtag IN ('+hashtags.toString()+'))) ORDER BY tweets.favorite_count DESC LIMIT 20 OFFSET '+skip, req.session.user.username ,function(err, tweets) 
								{
									if (err){
										console.log(err);
									}
									tweets_to_send = tweets;
									for (var i=0;i<tweets_to_send.length;i++)
									{
										tweets_to_send[i].created_at = tweets_to_send[i].created_at.toString();
									}
									res.json(tweets_to_send);
									connection.end();
									return;
								});
							}
						}
					}
				}
			}
			else if (order == 'retweets')
			{
				var usersBack = users;
				users = users.split(',');
				for (var i=0;i<users.length;i++)
				{
					users[i] = '\''+users[i]+'\'';
					if (i==users.length-1)
					{
						for (var i=0;i<hashtags.length;i++)
						{
							hashtags[i] = '\''+hashtags[i]+'\'';
							if (i==hashtags.length-1)
							{
								connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND (tweets.user IN ('+users.toString()+')'+') AND (tweets.id IN ( SELECT id FROM hashtags WHERE hashtags.hashtag IN ('+hashtags.toString()+'))) ORDER BY tweets.retweet_count DESC LIMIT 20 OFFSET '+skip, req.session.user.username ,function(err, tweets) 
								{
									if (err){
										console.log(err);
									}
									tweets_to_send = tweets;
									for (var i=0;i<tweets_to_send.length;i++)
									{
										tweets_to_send[i].created_at = tweets_to_send[i].created_at.toString();
									}
									res.json(tweets_to_send);
									connection.end();
									return;
								});
							}
						}
					}
				}
			}
			else if (order == 'dateDown')
			{
				var usersBack = users;
				users = users.split(',');
				for (var i=0;i<users.length;i++)
				{
					users[i] = '\''+users[i]+'\'';
					if (i==users.length-1)
					{
						for (var i=0;i<hashtags.length;i++)
						{
							hashtags[i] = '\''+hashtags[i]+'\'';
							if (i==hashtags.length-1)
							{
								connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND (tweets.user IN ('+users.toString()+')'+') AND (tweets.id IN ( SELECT id FROM hashtags WHERE hashtags.hashtag IN ('+hashtags.toString()+'))) ORDER BY tweets.created_at ASC LIMIT 20 OFFSET '+skip, req.session.user.username ,function(err, tweets) 
								{
									if (err){
										console.log(err);
									}
									tweets_to_send = tweets;
									for (var i=0;i<tweets_to_send.length;i++)
									{
										tweets_to_send[i].created_at = tweets_to_send[i].created_at.toString();
									}
									res.json(tweets_to_send);
									connection.end();
									return;
								});
							}
						}
					}
				}
			}
			else
			{
				var usersBack = users;
				users = users.split(',');
				for (var i=0;i<users.length;i++)
				{
					users[i] = '\''+users[i]+'\'';
					if (i==users.length-1)
					{
						for (var i=0;i<hashtags.length;i++)
						{
							hashtags[i] = '\''+hashtags[i]+'\'';
							if (i==hashtags.length-1)
							{
								connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND (tweets.user IN ('+users.toString()+')'+') AND (tweets.id IN ( SELECT id FROM hashtags WHERE hashtags.hashtag IN ('+hashtags.toString()+'))) ORDER BY tweets.created_at DESC LIMIT 20 OFFSET '+skip, req.session.user.username ,function(err, tweets) 
								{
									if (err){
										console.log(err);
									}
									tweets_to_send = tweets;
									for (var i=0;i<tweets_to_send.length;i++)
									{
										tweets_to_send[i].created_at = tweets_to_send[i].created_at.toString();
									}
									res.json(tweets_to_send);
									connection.end();
									return;
								});
							}
						}
					}
				}
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
				var usersBack = users;
				users = users.split(',');
				for (var i=0;i<users.length;i++)
				{
					users[i] = '\''+users[i]+'\'';
					if (i==users.length-1)
					{
						connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND ( tweets.created_at BETWEEN \''+date+' 00:00:00\' AND \''+date+' 23:59:59\' ) AND tweets.user IN ('+users.toString()+') '+'ORDER BY tweets.favorite_count DESC LIMIT 20 OFFSET '+skip, req.session.user.username ,function(err, tweets) 
						{
							if (err){
								console.log(err);
							}
							
							var tweets_to_send = tweets;
							for (var i=0;i<tweets_to_send.length;i++)
							{
								tweets_to_send[i].created_at = tweets_to_send[i].created_at.toString();
							}
							res.json(tweets_to_send);
							connection.end();
							return;
						});
					}
				}	
			}
			else if (order == 'retweets')
			{
				var usersBack = users;
				users = users.split(',');
				for (var i=0;i<users.length;i++)
				{
					users[i] = '\''+users[i]+'\'';
					if (i==users.length-1)
					{
						connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND ( tweets.created_at BETWEEN \''+date+' 00:00:00\' AND \''+date+' 23:59:59\' ) AND tweets.user IN ('+users.toString()+') '+'ORDER BY tweets.retweet_count DESC LIMIT 20 OFFSET '+skip, req.session.user.username ,function(err, tweets) 
						{
							if (err){
								console.log(err);
							}
							
							var tweets_to_send = tweets;
							for (var i=0;i<tweets_to_send.length;i++)
							{
								tweets_to_send[i].created_at = tweets_to_send[i].created_at.toString();
							}
							res.json(tweets_to_send);
							connection.end();
							return;
						});
					}
				}	
			}
			else if (order == 'dateDown')
			{
				var usersBack = users;
				users = users.split(',');
				for (var i=0;i<users.length;i++)
				{
					users[i] = '\''+users[i]+'\'';
					if (i==users.length-1)
					{
						connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND ( tweets.created_at BETWEEN \''+date+' 00:00:00\' AND \''+date+' 23:59:59\' ) AND tweets.user IN ('+users.toString()+') '+'ORDER BY tweets.created_at ASC LIMIT 20 OFFSET '+skip, req.session.user.username ,function(err, tweets) 
						{
							if (err){
								console.log(err);
							}
							
							var tweets_to_send = tweets;
							for (var i=0;i<tweets_to_send.length;i++)
							{
								tweets_to_send[i].created_at = tweets_to_send[i].created_at.toString();
							}
							res.json(tweets_to_send);
							connection.end();
							return;
						});
					}
				}	
			}
			else
			{
				var usersBack = users;
				users = users.split(',');
				for (var i=0;i<users.length;i++)
				{
					users[i] = '\''+users[i]+'\'';
					if (i==users.length-1)
					{
						connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND ( tweets.created_at BETWEEN \''+date+' 00:00:00\' AND \''+date+' 23:59:59\' ) AND tweets.user IN ('+users.toString()+') '+'ORDER BY tweets.created_at DESC LIMIT 20 OFFSET '+skip, req.session.user.username ,function(err, tweets) 
						{
							if (err){
								console.log(err);
							}
							
							var tweets_to_send = tweets;
							for (var i=0;i<tweets_to_send.length;i++)
							{
								tweets_to_send[i].created_at = tweets_to_send[i].created_at.toString();
							}
							res.json(tweets_to_send);
							connection.end();
							return;
						});
					}
				}	
			}
		}
		else if ((users == '')&&(hashtag != ''))
		{
			if (order == 'favorites')
			{
				for (var i=0;i<hashtags.length;i++)
				{
					hashtags[i] = '\''+hashtags[i]+'\'';
					if (i==hashtags.length-1)
					{
						connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND ( tweets.created_at BETWEEN \''+date+' 00:00:00\' AND \''+date+' 23:59:59\' ) AND (tweets.id IN ( SELECT id FROM hashtags WHERE hashtags.hashtag IN ('+hashtags.toString()+'))) ORDER BY tweets.favorite_count DESC LIMIT 20 OFFSET '+skip, req.session.user.username ,function(err, tweets) 
						{
							if (err){
								console.log(err);
							}
							tweets_to_send = tweets;
							for (var i=0;i<tweets_to_send.length;i++)
							{
								tweets_to_send[i].created_at = tweets_to_send[i].created_at.toString();
							}
							res.json(tweets_to_send);
							connection.end();
							return;
						});
					}
				}
			}
			else if (order == 'retweets')
			{
				for (var i=0;i<hashtags.length;i++)
				{
					hashtags[i] = '\''+hashtags[i]+'\'';
					if (i==hashtags.length-1)
					{
						connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND ( tweets.created_at BETWEEN \''+date+' 00:00:00\' AND \''+date+' 23:59:59\' ) AND (tweets.id IN ( SELECT id FROM hashtags WHERE hashtags.hashtag IN ('+hashtags.toString()+'))) ORDER BY tweets.retweet_count DESC LIMIT 20 OFFSET '+skip, req.session.user.username ,function(err, tweets) 
						{
							if (err){
								console.log(err);
							}
							tweets_to_send = tweets;
							for (var i=0;i<tweets_to_send.length;i++)
							{
								tweets_to_send[i].created_at = tweets_to_send[i].created_at.toString();
							}
							res.json(tweets_to_send);
							connection.end();
							return;
						});
					}
				}
			}
			else if (order == 'dateDown')
			{
				for (var i=0;i<hashtags.length;i++)
				{
					hashtags[i] = '\''+hashtags[i]+'\'';
					if (i==hashtags.length-1)
					{
						connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND ( tweets.created_at BETWEEN \''+date+' 00:00:00\' AND \''+date+' 23:59:59\' ) AND (tweets.id IN ( SELECT id FROM hashtags WHERE hashtags.hashtag IN ('+hashtags.toString()+'))) ORDER BY tweets.created_at ASC LIMIT 20 OFFSET '+skip, req.session.user.username ,function(err, tweets) 
						{
							if (err){
								console.log(err);
							}
							tweets_to_send = tweets;
							for (var i=0;i<tweets_to_send.length;i++)
							{
								tweets_to_send[i].created_at = tweets_to_send[i].created_at.toString();
							}
							res.json(tweets_to_send);
							connection.end();
							return;
						});
					}
				}
			}
			else
			{
				for (var i=0;i<hashtags.length;i++)
				{
					hashtags[i] = '\''+hashtags[i]+'\'';
					if (i==hashtags.length-1)
					{
						connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND ( tweets.created_at BETWEEN \''+date+' 00:00:00\' AND \''+date+' 23:59:59\' ) AND (tweets.id IN ( SELECT id FROM hashtags WHERE hashtags.hashtag IN ('+hashtags.toString()+'))) ORDER BY tweets.created_at DESC LIMIT 20 OFFSET '+skip, req.session.user.username ,function(err, tweets) 
						{
							if (err){
								console.log(err);
							}
							tweets_to_send = tweets;
							for (var i=0;i<tweets_to_send.length;i++)
							{
								tweets_to_send[i].created_at = tweets_to_send[i].created_at.toString();
							}
							res.json(tweets_to_send);
							connection.end();
							return;
						});
					}
				}
			}
		}
		else if ((users == '')&&(hashtag == ''))
		{
			if (order == 'favorites')
			{
				connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND ( tweets.created_at BETWEEN \''+date+' 00:00:00\' AND \''+date+' 23:59:59\' ) ORDER BY tweets.favorite_count DESC LIMIT 20 OFFSET '+skip, req.session.user.username ,function(err, tweets) 
				{
					if (err){
						console.log(err);
					}
					tweets_to_send = tweets;
					for (var i=0;i<tweets_to_send.length;i++)
					{
						tweets_to_send[i].created_at = tweets_to_send[i].created_at.toString();
					}
					res.json(tweets_to_send);
					connection.end();
					return;
				});
			}
			else if (order == 'retweets')
			{
				connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND ( tweets.created_at BETWEEN \''+date+' 00:00:00\' AND \''+date+' 23:59:59\' ) ORDER BY tweets.retweet_count DESC LIMIT 20 OFFSET '+skip, req.session.user.username ,function(err, tweets) 
				{
					if (err){
						console.log(err);
					}
					tweets_to_send = tweets;
					for (var i=0;i<tweets_to_send.length;i++)
					{
						tweets_to_send[i].created_at = tweets_to_send[i].created_at.toString();
					}
					res.json(tweets_to_send);
					connection.end();
					return;
				});
			}
			else if (order == 'dateDown')
			{
				connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND ( tweets.created_at BETWEEN \''+date+' 00:00:00\' AND \''+date+' 23:59:59\' ) ORDER BY tweets.created_at ASC LIMIT 20 OFFSET '+skip, req.session.user.username ,function(err, tweets) 
				{
					if (err){
						console.log(err);
					}
					tweets_to_send = tweets;
					for (var i=0;i<tweets_to_send.length;i++)
					{
						tweets_to_send[i].created_at = tweets_to_send[i].created_at.toString();
					}
					res.json(tweets_to_send);
					connection.end();
					return;
				});
			}
			else
			{
				connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND ( tweets.created_at BETWEEN \''+date+' 00:00:00\' AND \''+date+' 23:59:59\' ) ORDER BY tweets.created_at DESC LIMIT 20 OFFSET '+skip, req.session.user.username ,function(err, tweets) 
				{
					if (err){
						console.log(err);
					}
					tweets_to_send = tweets;
					for (var i=0;i<tweets_to_send.length;i++)
					{
						tweets_to_send[i].created_at = tweets_to_send[i].created_at.toString();
					}
					res.json(tweets_to_send);
					connection.end();
					return;
				});
			}
		}
		else
		{
			if (order == 'favorites')
			{
				var usersBack = users;
				users = users.split(',');
				for (var i=0;i<users.length;i++)
				{
					users[i] = '\''+users[i]+'\'';
					if (i==users.length-1)
					{
						for (var i=0;i<hashtags.length;i++)
						{
							hashtags[i] = '\''+hashtags[i]+'\'';
							if (i==hashtags.length-1)
							{
								connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND ( tweets.created_at BETWEEN \''+date+' 00:00:00\' AND \''+date+' 23:59:59\' ) AND tweets.user IN ('+users.toString()+') '+' AND (tweets.id IN ( SELECT id FROM hashtags WHERE hashtags.hashtag IN ('+hashtags.toString()+'))) ORDER BY tweets.favorite_count DESC LIMIT 20 OFFSET '+skip, req.session.user.username ,function(err, tweets) 
								{
									if (err){
										console.log(err);
									}
									tweets_to_send = tweets;
									for (var i=0;i<tweets_to_send.length;i++)
									{
										tweets_to_send[i].created_at = tweets_to_send[i].created_at.toString();
									}
									res.json(tweets_to_send);
									connection.end();
									return;
								});
							}
						}	
					}
				}	
			}
			else if (order == 'retweets')
			{
				var usersBack = users;
				users = users.split(',');
				for (var i=0;i<users.length;i++)
				{
					users[i] = '\''+users[i]+'\'';
					if (i==users.length-1)
					{
						for (var i=0;i<hashtags.length;i++)
						{
							hashtags[i] = '\''+hashtags[i]+'\'';
							if (i==hashtags.length-1)
							{
								connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND ( tweets.created_at BETWEEN \''+date+' 00:00:00\' AND \''+date+' 23:59:59\' ) AND tweets.user IN ('+users.toString()+') '+' AND (tweets.id IN ( SELECT id FROM hashtags WHERE hashtags.hashtag IN ('+hashtags.toString()+'))) ORDER BY tweets.retweet_count DESC LIMIT 20 OFFSET '+skip, req.session.user.username ,function(err, tweets) 
								{
									if (err){
										console.log(err);
									}
									tweets_to_send = tweets;
									for (var i=0;i<tweets_to_send.length;i++)
									{
										tweets_to_send[i].created_at = tweets_to_send[i].created_at.toString();
									}
									res.json(tweets_to_send);
									connection.end();
									return;
								});
							}
						}	
					}
				}	
			}
			else if (order == 'dateDown')
			{
				var usersBack = users;
				users = users.split(',');
				for (var i=0;i<users.length;i++)
				{
					users[i] = '\''+users[i]+'\'';
					if (i==users.length-1)
					{
						for (var i=0;i<hashtags.length;i++)
						{
							hashtags[i] = '\''+hashtags[i]+'\'';
							if (i==hashtags.length-1)
							{
								connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND ( tweets.created_at BETWEEN \''+date+' 00:00:00\' AND \''+date+' 23:59:59\' ) AND tweets.user IN ('+users.toString()+') '+' AND (tweets.id IN ( SELECT id FROM hashtags WHERE hashtags.hashtag IN ('+hashtags.toString()+'))) ORDER BY tweets.created_at ASC LIMIT 20 OFFSET '+skip, req.session.user.username ,function(err, tweets) 
								{
									if (err){
										console.log(err);
									}
									tweets_to_send = tweets;
									for (var i=0;i<tweets_to_send.length;i++)
									{
										tweets_to_send[i].created_at = tweets_to_send[i].created_at.toString();
									}
									res.json(tweets_to_send);
									connection.end();
									return;
								});
							}
						}	
					}
				}	
			}
			else
			{
				var usersBack = users;
				users = users.split(',');
				for (var i=0;i<users.length;i++)
				{
					users[i] = '\''+users[i]+'\'';
					if (i==users.length-1)
					{
						for (var i=0;i<hashtags.length;i++)
						{
							hashtags[i] = '\''+hashtags[i]+'\'';
							if (i==hashtags.length-1)
							{
								connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND ( tweets.created_at BETWEEN \''+date+' 00:00:00\' AND \''+date+' 23:59:59\' ) AND tweets.user IN ('+users.toString()+') '+' AND (tweets.id IN ( SELECT id FROM hashtags WHERE hashtags.hashtag IN ('+hashtags.toString()+'))) ORDER BY tweets.created_at DESC LIMIT 20 OFFSET '+skip, req.session.user.username ,function(err, tweets) 
								{
									if (err){
										console.log(err);
									}
									tweets_to_send = tweets;
									for (var i=0;i<tweets_to_send.length;i++)
									{
										tweets_to_send[i].created_at = tweets_to_send[i].created_at.toString();
									}
									res.json(tweets_to_send);
									connection.end();
									return;
								});
							}
						}	
					}
				}	
			}
		}
	}
}

function dateToDate(input){
	
	var date   = input.split('/');
	var day    = date[0];
	var year   = date[2];
	var month  = date[1];

	var output = year+'-'+month+'-'+day;
	return output;
}