var express 		= require('express');
var readline 		= require('readline');
var HashTable 		= require('hashtable');
var router 			= express.Router();
var mongodb 		= require('mongodb');
var mysql           = require('mysql');
var session         = require('client-sessions');


module.exports = function(req,res,tweets_to_add,filter,dateFrom,mode) 
{
	if (tweets_to_add == undefined)
		res.end();

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
		if (res!=null){
				res.end();
		}
		connection.end();
		if (req!=null)
			console.log("Added tweets to DataBase by user \'"+req.session.user.username+'\' , '+filter+',');
	};

	var usingItNow = function(callback,req,res,tweets_to_add,filter,dateFrom,mode) {

		var inserted = 0;
		for(var i=0;i<tweets_to_add.length;i++)
		{
			var twid = tweets_to_add[i];
			//console.log(i+'.');

			twid.created_at = dateToDate(twid.created_at);
			if (( filter != null ) && ( filter != undefined) && (tweets_to_add[i].id_str != null)&& (tweets_to_add[i].id_str != undefined) && (tweets_to_add[i]!=null)&& (tweets_to_add[i]!=undefined))
			{
				if (req != null)
				{
					var node = {
					    filter 		 	: filter,
					    username 		: req.session.user.username
					};
				}

				if (mode != 1 )
				{  
					var query = connection.query('insert into Belongs set ?', node , function(err,result) {
						if (!err){
					      	//console.log('Belongs added : '+node.id+','+node.username);
					    }
					    else{
					      	//console.log('Error while adding to Belongs.'+err);
					    }
					});
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
				    retweet_count 	: twid.retweet_count
				};

				var query = connection.query('insert into tweets set ?', tweet , function(err,result) {
					if (!err){
				      added++;
					}
				    else{
				      //console.log('Error while adding to tweets.'+err);
				      //console.log(tweet.text);
				    }
				});
			}

			var myCallback2 = function() {
				//console.log('/end of'+inserted);
	  			if (++inserted == tweets_to_add.length) {
					callback(added);
				}
			};

			var usingItNow2 = function(callback2 , twid , req,res,filter,dateFrom,mode){

				if (twid.entities.hashtags.length == 0)
					callback2();

				var inserted2 = 0;
				for (var j=0;j<twid.entities.hashtags.length;j++)
				{
					//console.log('\t'+j+','+twid.entities.hashtags[j].text);

				    if ((twid.entities.hashtags[j]!=null)&&(twid.entities.hashtags[j].text!='')){		

				    	var hashtag = {
						    id 		 		: twid.id_str,
						    hashtag 		: twid.entities.hashtags[j].text
						};

						var query = connection.query('insert into hashtags set ?', hashtag , function(err,result) {
							if (!err){
						      	//console.log('hashtags added : '+hashtag.id+','+hashtag.hashtag);
						    }
						    else{
						      	console.log('Error while adding to Hashtags.'+err);
						    }
						    if (++inserted2 == twid.entities.hashtags.length) {
								callback2();
							}
						});
					}
				}
			}
			usingItNow2(myCallback2,tweets_to_add[i],req,res,filter,dateFrom,mode);
		}

		/*var inserted = 0;
		for(var i=0;i<tweets_to_add.length;i++)
		{	
			tweets_to_add[i].created_at = dateToDate(tweets_to_add[i].created_at);
			if (( filter != null ) && ( filter != undefined) && (tweets_to_add[i].id_str != null)&& (tweets_to_add[i].id_str != undefined) && (tweets_to_add[i]!=null)&& (tweets_to_add[i]!=undefined))
			{
				var twid = tweets_to_add[i];
				var hash ='';
				
				if (twid.entities.hashtags.length == 0){
					hash = null;
					addto(req,filter,twid,hash,mode,added,duplicates,dateFrom,connection);
					if (++inserted == tweets_to_add.length) {
				        callback(added);
				    }
				}
				else
				{
					for (var j=0;j<twid.entities.hashtags.length;j++)
					{
						addto(req,filter,twid,twid.entities.hashtags[j].text,mode,added,duplicates,dateFrom,connection);
					}					
					if (++inserted == tweets_to_add.length) {
       					callback(added);
      				}
				}
			}
		}
		//callback(added);*/
	};
	usingItNow(myCallback,req,res,tweets_to_add,filter,dateFrom,mode);
};

function addto(req,filter,twid,hash,mode,added,duplicates,dateFrom,connection){
	if (req != null)
	{
		var node = {
		    filter 		 	: filter,
		    username 		: req.session.user.username
		};
	}

	var hashtag = {
	    id 		 		: twid.id_str,
	    hashtag 		: hash
	};

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
	    retweet_count 	: twid.retweet_count
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
	if ((hash!=null)&&(hash!='')){		
		var query = connection.query('insert into hashtags set ?', hashtag , function(err,result) {
			if (!err){
		      	//console.log('Belongs added : '+node.id+','+node.username);
		    }
		    else{
		      	console.log('Error while adding to Hashtags.'+err);
		    }
		});
	}
}


function dateToDate(input){
	if (input == undefined)
		return;
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