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

	connection.query('SELECT DISTINCT filter FROM tweets WHERE tweets.dateFrom IS NULL' ,function(err, filters) 
	{
		connection.end();
		if (err)
			console.log(err);
		else
		{
			for (var i=0;i<filters.length;i++)
			{
				//console.log(filters[i].filter);
				if (filters[i].filter[0] == '@')
				{
					var user = filters[i].filter.split('@');
					var myCallback = function(data) {
			          //insert data
			        	if (data!= undefined)
			          	{
			          		if (data.length<=200)
					        {
					          	var filt = ("@"+user[1]);
					          	addTweets(null,null,data,filt,null,1);
					        }
			          	}
			        };
			        searchTweets(user[1],myCallback,0,0,1);
				}
				else if (filters[i].filter[0] == '#')
				{
					var hashtag = filters[i].filter.split('#');

			        var myCallback = function(data) {
			          //insert data
			        	if (data!= undefined)
			          	{
				        	if (data.length<=200)
				          	{
					        	var filt = ("#"+hashtag[1]);
					        	addTweets(null,null,data,filt,null,1);
					      	}
					    }
			        };
			        searchTweets(hashtag[1],myCallback,0,0,0);
				}
				else
				{
					var text = filters[i].filter;
					var myCallback = function(data) {
			          //insert data
			        	if (data!= undefined)
			          	{
			          		if (data.length<=200)
				        		addTweets(null,null,data,text,null,1);
				        }
			        };
			        searchTweets(text,myCallback,0,0,0);
				}
			}
		}		
	});
}