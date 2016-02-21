var express         = require('express');
var last_get		= 0;
var view_tweets		= [];
var csrf            = require('csurf'); 
var session         = require('client-sessions');
var mysql           = require('mysql');

module.exports = function (req,res,path,order,skip)
{
	if ((skip == undefined) || (skip == null))
		skip = 0;

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
	        res.redirect('/home');
	        return;  
	    }
	});	

	var filter_options;
	var users;
	var hashtags;

	connection.query('SELECT DISTINCT t.filter FROM tweets t INNER JOIN Belongs b ON t.filter = b.filter WHERE b.username=\''+req.session.user.username+'\'ORDER BY filter;' ,function(err, filters) 
	{
		if (err){
			console.log(err);
			res.render(path, { title: 'Twitter Feed',csrfToken: req.csrfToken() });
			connection.end();
			return;
		}
		filter_options = filters;
	});
	connection.query('SELECT DISTINCT t.user FROM tweets t INNER JOIN Belongs b ON t.filter = b.filter WHERE b.username=\''+req.session.user.username+'\'ORDER BY screen_name;' ,function(err, usrs) 
	{
		if (err){
			console.log(err);
			res.render(path, { title: 'Twitter Feed',csrfToken: req.csrfToken() });
			connection.end();
			return;
		}
		users = usrs;
	});
	//connection.end();

	if ((skip!= 0)&&(skip!=undefined))	//skip tweets we have refresh
	{
		if (order == 'favorites')
		{
			connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = \''+req.session.user.username+'\') ORDER BY tweets.favorite_count DESC LIMIT 20 OFFSET '+skip+';' ,function(err, tweets) 
			{
				tweets_to_send = tweets;
				for (var i=0;i<tweets_to_send.length;i++)
				{
					tweets_to_send[i].created_at = tweets_to_send[i].created_at.toString();
				}
				res.json(tweets_to_send);
				connection.end();
				return;
				//console.log(tweets_to_send);
			});
		}
		else if (order == 'retweets')
		{
			connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = \''+req.session.user.username+'\') ORDER BY tweets.retweet_count DESC LIMIT 20 OFFSET '+skip+';' ,function(err, tweets) 
			{
				tweets_to_send = tweets;
				for (var i=0;i<tweets_to_send.length;i++)
				{
					tweets_to_send[i].created_at = tweets_to_send[i].created_at.toString();
				}
				res.json(tweets_to_send);
				connection.end();
				return;
				//console.log(tweets_to_send);
			});
		}
		else if (order == 'dateDown')
		{
			connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = \''+req.session.user.username+'\') ORDER BY tweets.created_at ASC LIMIT 20 OFFSET '+skip+';' ,function(err, tweets) 
			{
				tweets_to_send = tweets;
				for (var i=0;i<tweets_to_send.length;i++)
				{
					tweets_to_send[i].created_at = tweets_to_send[i].created_at.toString();
				}
				res.json(tweets_to_send);
				connection.end();
				return;
				//console.log(tweets_to_send);
			});
		}
		else //Date Up default option
		{
			connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = \''+req.session.user.username+'\') ORDER BY tweets.created_at DESC LIMIT 20 OFFSET '+skip+';' ,function(err, tweets) 
			{
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
	else //without skip tweets
	{
		if (order == 'favorites')
		{
			connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) ORDER BY tweets.favorite_count DESC LIMIT 20', req.session.user.username ,function(err, tweets) 
			{
				if (err){
					console.log(err);
					res.render(path, { title: 'Twitter Feed',csrfToken: req.csrfToken() });
					return;
				}
				tweets_to_send = tweets;

				connection.query('SELECT DISTINCT hashtag FROM hashtags WHERE id IN (SELECT id FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE Belongs.username = ? )) ORDER BY hashtag', req.session.user.username ,function(err, hash) 
				{
					if (err){
						console.log(err);
						res.render(path, { title: 'Twitter Feed',csrfToken: req.csrfToken() });
						return;
					}
					res.render(path, { title: 'Twitter Feed',user:req.session.user.username, tweet_data: tweets_to_send , 'load_options':  filter_options , 'users': users , 'hash': hash, csrfToken: req.csrfToken() });
					connection.end();
					return;
				});
			});
		}
		else if (order == 'retweets')
		{
			connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) ORDER BY tweets.retweet_count DESC LIMIT 20', req.session.user.username ,function(err, tweets) 
			{
				if (err){
					console.log(err);
					res.render(path, { title: 'Twitter Feed',csrfToken: req.csrfToken() });
					return;
				}
				tweets_to_send = tweets;

				connection.query('SELECT DISTINCT hashtag FROM hashtags WHERE id IN (SELECT id FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE Belongs.username = ? )) ORDER BY hashtag', req.session.user.username ,function(err, hash) 
				{
					if (err){
						console.log(err);
						res.render(path, { title: 'Twitter Feed',csrfToken: req.csrfToken() });
						return;
					}
					res.render(path, { title: 'Twitter Feed',user:req.session.user.username, tweet_data: tweets_to_send , 'load_options':  filter_options , 'users': users , 'hash': hash, csrfToken: req.csrfToken() });
					connection.end();
					return;
				});
			});
		}
		else if (order == 'dateDown')
		{
			connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) ORDER BY tweets.created_at ASC LIMIT 20', req.session.user.username ,function(err, tweets) 
			{
				if (err){
					console.log(err);
					res.render(path, { title: 'Twitter Feed',csrfToken: req.csrfToken() });
					return;
				}
				tweets_to_send = tweets;

				connection.query('SELECT DISTINCT hashtag FROM hashtags WHERE id IN (SELECT id FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE Belongs.username = ? )) ORDER BY hashtag', req.session.user.username ,function(err, hash) 
				{
					if (err){
						console.log(err);
						res.render(path, { title: 'Twitter Feed',csrfToken: req.csrfToken() });
						return;
					}
					res.render(path, { title: 'Twitter Feed',user:req.session.user.username, tweet_data: tweets_to_send , 'load_options':  filter_options , 'users': users , 'hash': hash, csrfToken: req.csrfToken() });
					connection.end();
					return;
				});
			});
		}
		else //Date Up default option
		{
			connection.query('SELECT DISTINCT * FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE  Belongs.username = ?) ORDER BY tweets.created_at DESC LIMIT 20', req.session.user.username ,function(err, tweets) 
			{
				if (err){
					console.log(err);
					res.render(path, { title: 'Twitter Feed',csrfToken: req.csrfToken() });
					return;
				}
				tweets_to_send = tweets;

				connection.query('SELECT DISTINCT hashtag FROM hashtags WHERE id IN (SELECT id FROM tweets WHERE tweets.filter IN ( SELECT filter FROM Belongs WHERE Belongs.username = ? )) ORDER BY hashtag', req.session.user.username ,function(err, hash) 
				{
					if (err){
						console.log(err);
						res.render(path, { title: 'Twitter Feed',csrfToken: req.csrfToken() });
						return;
					}
					res.render(path, { title: 'Twitter Feed',user:req.session.user.username, tweet_data: tweets_to_send , 'load_options':  filter_options , 'users': users , 'hash': hash, csrfToken: req.csrfToken() });
					connection.end();
					return;
				});
			});
		}
	}
}