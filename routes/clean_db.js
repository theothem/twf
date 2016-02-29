var express         = require('express');
var mysql           = require('mysql');
var csrf            = require('csurf'); 
var session         = require('client-sessions');

module.exports = function (searchTweets,addTweets)
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
	        return;  
	    }
	});	

	connection.query('DELETE FROM tweets WHERE tweets.filter NOT IN (SELECT DISTINCT filter from Belongs)' ,function(err, filters) 
	{
		connection.end();
		if (err)
			console.log(err);
		else
		{
			console.log('Database has been cleaned!');
		}		
	});
}