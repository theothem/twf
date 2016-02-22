var express         = require('express');
var csrf            = require('csurf');
var session         = require('client-sessions'); 
var mysql           = require('mysql');

module.exports = function (users,hashtag,date,req,res,path,order)
{	
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

	var fhashtags;
	var users_returned;
	var filter_options;

	connection.query('SELECT DISTINCT hashtag FROM hashtags WHERE id IN (SELECT id FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE Belongs.username = ? )) ORDER BY hashtag', req.session.user.username ,function(err, hashtags) 
	{
		if (err){
			console.log(err);
		}
		fhashtags = hashtags;
	});

	connection.query('SELECT DISTINCT t.filter FROM tweets t INNER JOIN Belongs b ON t.filter = b.filter WHERE b.username=\''+req.session.user.username+'\'ORDER BY t.filter;' ,function(err, filters) 
	{
		if (err){
			console.log(err);
		}
		filter_options = filters;
	});

	connection.query('SELECT DISTINCT t.user FROM tweets t INNER JOIN Belongs b ON t.filter = b.filter WHERE b.username=\''+req.session.user.username+'\'ORDER BY user;' ,function(err, usrs) 
	{
		if (err){
			console.log(err);
		}
		users_returned = usrs;
	});

	if (date=='')
	{
		if ((users != '')&&(hashtag == ''))
		{
			if (order == 'favorites')
			{
				//console.log(users);
				var usersBack = users;
				users = users.split(',');
				for (var i=0;i<users.length;i++)
				{
					users[i] = '\''+users[i]+'\'';
					if (i==users.length-1)
					{
						connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND tweets.user IN ('+users.toString()+') '+'ORDER BY tweets.favorite_count DESC LIMIT 20', req.session.user.username ,function(err, tweets) 
						{
							if (err){
								console.log(err);
							}
							res.render(path, {usr:req.session.user.username , 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options , 'usersFilter': users_returned, 'users': usersBack ,'hash': fhashtags , 'url': hashtags,'date':'',csrfToken: req.csrfToken()});
						});
					}
				}	
			}
			else if (order == 'retweets')
			{
				//console.log(users);
				var usersBack = users;
				users = users.split(',');
				for (var i=0;i<users.length;i++)
				{
					users[i] = '\''+users[i]+'\'';
					if (i==users.length-1)
					{
						connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND tweets.user IN ('+users.toString()+') '+'ORDER BY tweets.retweet_count DESC LIMIT 20', req.session.user.username ,function(err, tweets) 
						{
							if (err){
								console.log(err);
							}
							res.render(path, {usr:req.session.user.username , 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options , 'usersFilter': users_returned, 'users': usersBack ,'hash': fhashtags , 'url': hashtags,'date':'',csrfToken: req.csrfToken()});
						});
					}
				}
			}
			else if (order == 'dateDown')
			{
				//console.log(users);
				var usersBack = users;
				users = users.split(',');
				for (var i=0;i<users.length;i++)
				{
					users[i] = '\''+users[i]+'\'';
					if (i==users.length-1)
					{
						connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND tweets.user IN ('+users.toString()+') '+'ORDER BY tweets.created_at ASC LIMIT 20', req.session.user.username ,function(err, tweets) 
						{
							if (err){
								console.log(err);
							}
							res.render(path, {usr:req.session.user.username , 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options , 'usersFilter': users_returned, 'users': usersBack ,'hash': fhashtags , 'url': hashtags,'date':'',csrfToken: req.csrfToken()});
						});
					}
				}
			}
			else
			{
				//console.log(users);
				var usersBack = users;
				users = users.split(',');
				for (var i=0;i<users.length;i++)
				{
					users[i] = '\''+users[i]+'\'';
					if (i==users.length-1)
					{
						connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND tweets.user IN ('+users.toString()+') '+'ORDER BY tweets.created_at DESC LIMIT 20', req.session.user.username ,function(err, tweets) 
						{
							if (err){
								console.log(err);
							}
							res.render(path, {usr:req.session.user.username , 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options , 'usersFilter': users_returned, 'users': usersBack ,'hash': fhashtags , 'url': hashtags,'date':'',csrfToken: req.csrfToken()});
						});
					}
				}
			}
		}
		else if ((users == '')&&(hashtag != ''))
		{
			if (order == 'favorites')
			{
				var hashtagsBack = hashtags.toString();				
				for (var i=0;i<hashtags.length;i++)
				{
					hashtags[i] = '\''+hashtags[i]+'\'';
					if (i==hashtags.length-1)
					{
						connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND (tweets.id IN ( SELECT id FROM hashtags WHERE hashtags.hashtag IN ('+hashtags.toString()+'))) ORDER BY tweets.favorite_count DESC LIMIT 20', req.session.user.username ,function(err, tweets) 
						{
							if (err){
								console.log(err);
							}
							res.render(path, {usr:req.session.user.username , 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options , 'usersFilter': users_returned, 'users': usersBack ,'hash': fhashtags , 'url': hashtagsBack,'date':'',csrfToken: req.csrfToken()});
						});
					}
				}
			}
			else if (order == 'retweets')
			{
				var hashtagsBack = hashtags.toString();				
				for (var i=0;i<hashtags.length;i++)
				{
					hashtags[i] = '\''+hashtags[i]+'\'';
					if (i==hashtags.length-1)
					{
						connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND (tweets.id IN ( SELECT id FROM hashtags WHERE hashtags.hashtag IN ('+hashtags.toString()+'))) ORDER BY tweets.retweet_count DESC LIMIT 20', req.session.user.username ,function(err, tweets) 
						{
							if (err){
								console.log(err);
							}
							res.render(path, {usr:req.session.user.username , 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options , 'usersFilter': users_returned, 'users': usersBack ,'hash': fhashtags , 'url': hashtagsBack,'date':'',csrfToken: req.csrfToken()});
						});
					}
				}
			}
			else if (order == 'dateDown')
			{
				var hashtagsBack = hashtags.toString();				
				for (var i=0;i<hashtags.length;i++)
				{
					hashtags[i] = '\''+hashtags[i]+'\'';
					if (i==hashtags.length-1)
					{
						connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND (tweets.id IN ( SELECT id FROM hashtags WHERE hashtags.hashtag IN ('+hashtags.toString()+'))) ORDER BY tweets.created_at ASC LIMIT 20', req.session.user.username ,function(err, tweets) 
						{
							if (err){
								console.log(err);
							}
							res.render(path, {usr:req.session.user.username , 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options , 'usersFilter': users_returned , 'users': usersBack ,'hash': fhashtags  , 'url': hashtagsBack,'date':'',csrfToken: req.csrfToken()});
						});
					}
				}
			}
			else
			{
				var hashtagsBack = hashtags.toString();				
				for (var i=0;i<hashtags.length;i++)
				{
					hashtags[i] = '\''+hashtags[i]+'\'';
					if (i==hashtags.length-1)
					{
						connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND (tweets.id IN ( SELECT id FROM hashtags WHERE hashtags.hashtag IN ('+hashtags.toString()+'))) ORDER BY tweets.created_at DESC LIMIT 20', req.session.user.username ,function(err, tweets) 
						{
							if (err){
								console.log(err);
							}
							res.render(path, {usr:req.session.user.username , 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options , 'usersFilter': users_returned, 'users': usersBack ,'hash': fhashtags , 'url': hashtagsBack,'date':'',csrfToken: req.csrfToken()});
						});
					}
				}
			}
		}
		else
		{
			if (order == 'favorites')
			{
				var hashtagsBack = hashtags.toString();				
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
								connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND (tweets.id IN ( SELECT id FROM hashtags WHERE hashtags.hashtag IN ('+hashtags.toString()+'))) ORDER BY tweets.favorite_count DESC LIMIT 20', req.session.user.username ,function(err, tweets) 
								{
									if (err){
										console.log(err);
									}
									res.render(path, {usr:req.session.user.username , 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options , 'usersFilter': users_returned, 'users': usersBack ,'hash': fhashtags , 'url': hashtagsBack,'date':'',csrfToken: req.csrfToken()});
								});
							}
						}
					}
				}
			}
			else if (order == 'retweets')
			{
				var hashtagsBack = hashtags.toString();				
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
								connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND (tweets.id IN ( SELECT id FROM hashtags WHERE hashtags.hashtag IN ('+hashtags.toString()+'))) ORDER BY tweets.retweet_count DESC LIMIT 20', req.session.user.username ,function(err, tweets) 
								{
									if (err){
										console.log(err);
									}
									res.render(path, {usr:req.session.user.username , 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options, 'usersFilter': users_returned, 'users': usersBack ,'hash': fhashtags , 'url': hashtagsBack,'date':'',csrfToken: req.csrfToken()});
								});
							}
						}
					}
				}
			}
			else if (order == 'dateDown')
			{
				var hashtagsBack = hashtags.toString();				
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
								connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND (tweets.id IN ( SELECT id FROM hashtags WHERE hashtags.hashtag IN ('+hashtags.toString()+'))) ORDER BY tweets.created_at ASC LIMIT 20', req.session.user.username ,function(err, tweets) 
								{
									if (err){
										console.log(err);
									}
									res.render(path, {usr:req.session.user.username , 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options , 'usersFilter': users_returned, 'users': usersBack ,'hash': fhashtags , 'url': hashtagsBack,'date':'',csrfToken: req.csrfToken()});
								});
							}
						}
					}
				}
			}
			else
			{
				var hashtagsBack = hashtags.toString();				
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
								connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND (tweets.id IN ( SELECT id FROM hashtags WHERE hashtags.hashtag IN ('+hashtags.toString()+'))) ORDER BY tweets.created_at DESC LIMIT 20', req.session.user.username ,function(err, tweets) 
								{
									if (err){
										console.log(err);
									}
									res.render(path, {usr:req.session.user.username , 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options , 'usersFilter': users_returned, 'users': usersBack ,'hash': fhashtags , 'url': hashtagsBack,'date':'',csrfToken: req.csrfToken()});
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
				//console.log(users);
				var usersBack = users;
				users = users.split(',');
				for (var i=0;i<users.length;i++)
				{
					users[i] = '\''+users[i]+'\'';
					if (i==users.length-1)
					{
						connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND ( tweets.created_at BETWEEN \''+date+' 00:00:00\' AND \''+date+' 23:59:59\' ) AND tweets.user IN ('+users.toString()+') '+'ORDER BY tweets.favorite_count DESC LIMIT 20', req.session.user.username ,function(err, tweets) 
						{
							if (err){
								console.log(err);
							}
							res.render(path, {usr:req.session.user.username , 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options , 'usersFilter': users_returned, 'users': usersBack ,'hash': fhashtags , 'url': hashtags,'date':date,csrfToken: req.csrfToken()});
						});
					}
				}	
			}
			else if (order == 'retweets')
			{
				//console.log(users);
				var usersBack = users;
				users = users.split(',');
				for (var i=0;i<users.length;i++)
				{
					users[i] = '\''+users[i]+'\'';
					if (i==users.length-1)
					{
						connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND ( tweets.created_at BETWEEN \''+date+' 00:00:00\' AND \''+date+' 23:59:59\' ) AND tweets.user IN ('+users.toString()+') '+'ORDER BY tweets.retweet_count DESC LIMIT 20', req.session.user.username ,function(err, tweets) 
						{
							if (err){
								console.log(err);
							}
							res.render(path, {usr:req.session.user.username , 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options , 'usersFilter': users_returned, 'users': usersBack ,'hash': fhashtags , 'url': hashtags,'date':date,csrfToken: req.csrfToken()});
						});
					}
				}
			}
			else if (order == 'dateDown')
			{
				//console.log(users);
				var usersBack = users;
				users = users.split(',');
				for (var i=0;i<users.length;i++)
				{
					users[i] = '\''+users[i]+'\'';
					if (i==users.length-1)
					{
						connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND ( tweets.created_at BETWEEN \''+date+' 00:00:00\' AND \''+date+' 23:59:59\' ) AND tweets.user IN ('+users.toString()+') '+'ORDER BY tweets.created_at ASC LIMIT 20', req.session.user.username ,function(err, tweets) 
						{
							if (err){
								console.log(err);
							}
							res.render(path, {usr:req.session.user.username , 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options, 'usersFilter': users_returned, 'users': usersBack ,'hash': fhashtags , 'url': hashtags,'date':date,csrfToken: req.csrfToken()});
						});
					}
				}
			}
			else
			{
				//console.log(users);
				var usersBack = users;
				users = users.split(',');
				for (var i=0;i<users.length;i++)
				{
					users[i] = '\''+users[i]+'\'';
					if (i==users.length-1)
					{
						connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND ( tweets.created_at BETWEEN \''+date+' 00:00:00\' AND \''+date+' 23:59:59\' ) AND tweets.user IN ('+users.toString()+') '+'ORDER BY tweets.created_at DESC LIMIT 20', req.session.user.username ,function(err, tweets) 
						{
							if (err){
								console.log(err);
							}
							res.render(path, {usr:req.session.user.username , 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options , 'usersFilter': users_returned, 'users': usersBack ,'hash': fhashtags , 'url': hashtags,'date':date,csrfToken: req.csrfToken()});
						});
					}
				}
			}
		}
		else if ((users == '')&&(hashtag != ''))
		{
			if (order == 'favorites')
			{
				var hashtagsBack = hashtags.toString();				
				for (var i=0;i<hashtags.length;i++)
				{
					hashtags[i] = '\''+hashtags[i]+'\'';
					if (i==hashtags.length-1)
					{
						connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND ( tweets.created_at BETWEEN \''+date+' 00:00:00\' AND \''+date+' 23:59:59\' ) AND (tweets.id IN ( SELECT id FROM hashtags WHERE hashtags.hashtag IN ('+hashtags.toString()+'))) ORDER BY tweets.favorite_count DESC LIMIT 20', req.session.user.username ,function(err, tweets) 
						{
							if (err){
								console.log(err);
							}
							res.render(path, {usr:req.session.user.username , 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options , 'usersFilter': users_returned, 'users': usersBack ,'hash': fhashtags , 'url': hashtagsBack,'date':date,csrfToken: req.csrfToken()});
						});
					}
				}
			}
			else if (order == 'retweets')
			{
				var hashtagsBack = hashtags.toString();				
				for (var i=0;i<hashtags.length;i++)
				{
					hashtags[i] = '\''+hashtags[i]+'\'';
					if (i==hashtags.length-1)
					{
						connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND ( tweets.created_at BETWEEN \''+date+' 00:00:00\' AND \''+date+' 23:59:59\' ) AND (tweets.id IN ( SELECT id FROM hashtags WHERE hashtags.hashtag IN ('+hashtags.toString()+'))) ORDER BY tweets.retweet_count DESC LIMIT 20', req.session.user.username ,function(err, tweets) 
						{
							if (err){
								console.log(err);
							}
							res.render(path, {usr:req.session.user.username , 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options , 'usersFilter': users_returned, 'users': usersBack ,'hash': fhashtags , 'url': hashtagsBack,'date':date,csrfToken: req.csrfToken()});
						});
					}
				}
			}
			else if (order == 'dateDown')
			{
				var hashtagsBack = hashtags.toString();				
				for (var i=0;i<hashtags.length;i++)
				{
					hashtags[i] = '\''+hashtags[i]+'\'';
					if (i==hashtags.length-1)
					{
						connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND ( tweets.created_at BETWEEN \''+date+' 00:00:00\' AND \''+date+' 23:59:59\' ) AND (tweets.id IN ( SELECT id FROM hashtags WHERE hashtags.hashtag IN ('+hashtags.toString()+'))) ORDER BY tweets.created_at ASC LIMIT 20', req.session.user.username ,function(err, tweets) 
						{
							if (err){
								console.log(err);
							}
							res.render(path, {usr:req.session.user.username , 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options , 'usersFilter': users_returned, 'users': usersBack ,'hash': fhashtags , 'url': hashtagsBack,'date':date,csrfToken: req.csrfToken()});
						});
					}
				}
			}
			else
			{
				var hashtagsBack = hashtags.toString();				
				for (var i=0;i<hashtags.length;i++)
				{
					hashtags[i] = '\''+hashtags[i]+'\'';
					if (i==hashtags.length-1)
					{
						connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND ( tweets.created_at BETWEEN \''+date+' 00:00:00\' AND \''+date+' 23:59:59\' ) AND (tweets.id IN ( SELECT id FROM hashtags WHERE hashtags.hashtag IN ('+hashtags.toString()+'))) ORDER BY tweets.created_at DESC LIMIT 20', req.session.user.username ,function(err, tweets) 
						{
							if (err){
								console.log(err);
							}
							res.render(path, {usr:req.session.user.username , 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options , 'usersFilter': users_returned, 'users': usersBack ,'hash': fhashtags , 'url': hashtagsBack,'date':date,csrfToken: req.csrfToken()});
						});
					}
				}
			}
		}
		else if ((users == '')&&(hashtag == ''))
		{
			if (order == 'favorites')
			{
				connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND ( tweets.created_at BETWEEN \''+date+' 00:00:00\' AND \''+date+' 23:59:59\' ) ORDER BY tweets.favorite_count DESC LIMIT 20', req.session.user.username ,function(err, tweets) 
				{
					if (err){
						console.log(err);
					}
					res.render(path, {usr:req.session.user.username , 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options , 'usersFilter': users_returned, 'users': '' ,'hash': fhashtags , 'url': '','date':date,csrfToken: req.csrfToken()});
				});
			}
			else if (order == 'retweets')
			{
				connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND ( tweets.created_at BETWEEN \''+date+' 00:00:00\' AND \''+date+' 23:59:59\' ) ORDER BY tweets.retweet_count DESC LIMIT 20', req.session.user.username ,function(err, tweets) 
				{
					if (err){
						console.log(err);
					}
					res.render(path, {usr:req.session.user.username , 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options , 'usersFilter': users_returned, 'users': '' ,'hash': fhashtags , 'url': '','date':date,csrfToken: req.csrfToken()});
				});
			}
			else if (order == 'dateDown')
			{
				connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND ( tweets.created_at BETWEEN \''+date+' 00:00:00\' AND \''+date+' 23:59:59\' ) ORDER BY tweets.created_at ASC LIMIT 20', req.session.user.username ,function(err, tweets) 
				{
					if (err){
						console.log(err);
					}
					res.render(path, {usr:req.session.user.username , 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options , 'usersFilter': users_returned, 'users': '' ,'hash': fhashtags , 'url': '','date':date,csrfToken: req.csrfToken()});
				});
			}
			else
			{
				connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND ( tweets.created_at BETWEEN \''+date+' 00:00:00\' AND \''+date+' 23:59:59\' ) ORDER BY tweets.created_at DESC LIMIT 20', req.session.user.username ,function(err, tweets) 
				{
					if (err){
						console.log(err);
					}
					res.render(path, {usr:req.session.user.username , 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options , 'usersFilter': users_returned, 'users': '' ,'hash': fhashtags , 'url': '','date':date,csrfToken: req.csrfToken()});
				});
			}
		}
		else
		{
			if (order == 'favorites')
			{
				var usersBack = users;
				users = users.split(',');
				var hashtagsBack = hashtags.toString();	

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
								connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND ( tweets.created_at BETWEEN \''+date+' 00:00:00\' AND \''+date+' 23:59:59\' ) AND tweets.user IN ('+users.toString()+') '+' AND (tweets.id IN ( SELECT id FROM hashtags WHERE hashtags.hashtag IN ('+hashtags.toString()+'))) ORDER BY tweets.favorite_count DESC LIMIT 20', req.session.user.username ,function(err, tweets) 
								{
									if (err){
										console.log(err);
									}
									res.render(path, {usr:req.session.user.username , 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options , 'usersFilter': users_returned, 'users': usersBack ,'hash': fhashtags , 'url': hashtagsBack,'date':date,csrfToken: req.csrfToken()});
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
				var hashtagsBack = hashtags.toString();	

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
								connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND ( tweets.created_at BETWEEN \''+date+' 00:00:00\' AND \''+date+' 23:59:59\' ) AND tweets.user IN ('+users.toString()+') '+' AND (tweets.id IN ( SELECT id FROM hashtags WHERE hashtags.hashtag IN ('+hashtags.toString()+'))) ORDER BY tweets.retweet_count DESC LIMIT 20', req.session.user.username ,function(err, tweets) 
								{
									if (err){
										console.log(err);
									}
									res.render(path, {usr:req.session.user.username , 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options , 'usersFilter': users_returned, 'users': usersBack ,'hash': fhashtags , 'url': hashtagsBack,'date':date,csrfToken: req.csrfToken()});
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
				var hashtagsBack = hashtags.toString();	

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
								connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND ( tweets.created_at BETWEEN \''+date+' 00:00:00\' AND \''+date+' 23:59:59\' ) AND tweets.user IN ('+users.toString()+') '+' AND (tweets.id IN ( SELECT id FROM hashtags WHERE hashtags.hashtag IN ('+hashtags.toString()+'))) ORDER BY tweets.created_at ASC LIMIT 20', req.session.user.username ,function(err, tweets) 
								{
									if (err){
										console.log(err);
									}
									res.render(path, {usr:req.session.user.username , 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options , 'usersFilter': users_returned, 'users': usersBack ,'hash': fhashtags , 'url': hashtagsBack,'date':date,csrfToken: req.csrfToken()});
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
				var hashtagsBack = hashtags.toString();	

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
								connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) AND ( tweets.created_at BETWEEN \''+date+' 00:00:00\' AND \''+date+' 23:59:59\' ) AND tweets.user IN ('+users.toString()+') '+' AND (tweets.id IN ( SELECT id FROM hashtags WHERE hashtags.hashtag IN ('+hashtags.toString()+'))) ORDER BY tweets.created_at DESC LIMIT 20', req.session.user.username ,function(err, tweets) 
								{
									if (err){
										console.log(err);
									}
									res.render(path, {usr:req.session.user.username , 'title': 'filters' , tweet_data: tweets , 'load_options':  filter_options , 'usersFilter': users_returned, 'users': usersBack ,'hash': fhashtags , 'url': hashtagsBack,'date':date,csrfToken: req.csrfToken()});
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