var express   = require('express');
var router    = express.Router();
var getTweets   = require('./getTweets');
var mongodb     = require('mongodb');
var mysql           = require('mysql');
var session         = require('client-sessions');

/* GET home page. */
module.exports = function (req , res , next)
{
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
	        res.redirect('/');
	        return;  
	    }
	});

	if (req.session && req.session.user)
	{

		connection.query('SELECT DISTINCT t.filter FROM tweets t INNER JOIN Belongs b ON t.filter = b.filter WHERE b.username=\''+req.session.user.username+'\';' ,function(err, filters) 
  		{
  			if (err)
  				console.log(err);
			res.render('home', { 'load_options':  filters , title: 'Twitter Feed' , user:req.session.user.username , csrfToken: req.csrfToken()});
  		});
	}
	connection.end();
};

