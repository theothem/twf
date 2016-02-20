var express 		= require('express');
var readline 		= require('readline');
var HashTable 		= require('hashtable');
var router 			= express.Router();
var mongodb 		= require('mongodb');
var mysql           = require('mysql');
var session         = require('client-sessions');


module.exports = function(req,res,tweets_to_add,filter,dateFrom,mode) 
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
	        res.redirect('/home');
	        return;  
	    }
	});

	var added 				= 0;
	var duplicates  		= 0;

	var myCallback = function(data) {
	  	//insert data
		if (res!=null)
			res.end();
		connection.end();
		if (req!=null)
			console.log("Added tweets to DataBase by user \'"+req.session.user.username+'\' , '+filter+',');
	};

// /{"text":"ThisIsACoup","indices":[36,48]},{"text":"skai","indices":[54,59]},{"text":"skai_xeftiles","indices":[71,85]}]

	var usingItNow = function(callback,tweets_to_add,dateFrom,mode) {
		var i=0;
		for(i=0;i<tweets_to_add.length;i++)
		{	
			tweets_to_add[i].created_at = dateToDate(tweets_to_add[i].created_at);
			if (( filter != null ) && ( filter != undefined) && (tweets_to_add[i].id_str != null)&& (tweets_to_add[i].id_str != undefined) && (tweets_to_add[i]!=null)&& (tweets_to_add[i]!=undefined))
			{
				var twid = tweets_to_add[i];
				var hash = JSON.stringify(twid.entities.hashtags);
				
				if (hash == '[]')
					hash = null;
				//console.log(hash);
				if (req != null)
				{
					var node = {
					    filter 		 	: filter,
					    username 		: req.session.user.username
					};
				}

				var tweet = {
				    id 		 		: twid.id_str,
				    filter	 		: filter,
				    created_at		: twid.created_at,
				    dateFrom		: dateFrom,
				    user    		: twid.user.screen_name,
				    screen_name 	: twid.user.name,
				    profile_img 	: twid.user.profile_image_url,
				    text 			: twid.text,
				    favorite_count 	: twid.favorite_count,
				    retweet_count 	: twid.retweet_count,
				    hashtags 		: hash
				};
				if (mode != 1 )
				{
					var query = connection.query('insert into Belongs set ?', node , function(err,result) {
						if (!err){
					      	//console.log('Belongs added : '+node.id+','+node.username);
					    }
					    else{
					      	console.log('Error while adding to Belongs.'+err);
					    }
					});
				}
				var query = connection.query('insert into tweets set ?', tweet , function(err,result) {
					if (!err){
				      added++;
					}
				    else
				      duplicates++;
				});
			}
			//console.log('-------\n');
		}
		function waitAndDo(times) {
		  if(times < 1) {
		    return;
		  }
		  setTimeout(function() {
		    callback(added);
		    waitAndDo(times-1);
		  }, 1000);
		}
		waitAndDo(1);
	};
	usingItNow(myCallback,tweets_to_add,dateFrom,mode);

};


function dateToDate(input){
	var date = input.split(' ');
	if (date[1] == 'Jan')
		date[1] = '01';
	else if (date[1] == 'Feb')
		date[1] = '02';
	else if (date[1] == 'Mar')
		date[1] = '03';
	else if (date[1] == 'Apr')
		date[1] = '04';
	else if (date[1] == 'May')
		date[1] = '05';
	else if (date[1] == 'Jun')
		date[1] = '06';
	else if (date[1] == 'Jul')
		date[1] = '07';
	else if (date[1] == 'Aug')
		date[1] = '08';
	else if (date[1] == 'Sep')
		date[1] = '09';
	else if (date[1] == 'Oct')
		date[1] = '10';
	else if (date[1] == 'Nov')
		date[1] = '11';
	else if (date[1] == 'Dec')
		date[1] = '12';


	var output = date[5]+'-'+date[1]+'-'+date[2]+'-'+date[3];
	
	return output;
}