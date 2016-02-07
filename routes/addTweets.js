var express 		= require('express');
var readline 		= require('readline');
var HashTable 		= require('hashtable');
var router 			= express.Router();
var mongodb 		= require('mongodb');


module.exports = function(res,tweets_to_add,filter) 
{
	var MongoClient = mongodb.MongoClient;
	var url = 'mongodb://localhost:27017/twfDB';
	MongoClient.connect(url, function (err, db) {
	  if (err) {
	    console.log('Unable to connect to the mongoDB server. Error:', err);
	  } else {
		var added 				= 0;
		var duplicates  		= 0;
		console.log("Added tweets to DataBase "+filter);

		var myCallback = function(data) {
		  	//insert data
	      	//console.log('Collected         : '+tweets_to_add.length+' tweets.\n');
			//console.log('Duplicates User   : '+tweets_to_add.length-data+'.\n');
			//console.log('Added to database : '+data+' new tweets.\n');
			if (res!=null)
				res.render('../public/js/index' ,{ resp : 'ok' } );
			db.close();
		};

		var usingItNow = function(callback,tweets_to_add) {
			var i=0;
			for(i=0;i<tweets_to_add.length;i++)
			{	
				tweets_to_add[i].created_at = dateToDate(tweets_to_add[i].created_at);
				db.collection('tweets').insert(  {'_id' : tweets_to_add[i].id_str , 'filter': filter ,'tweet' : tweets_to_add[i] }  ,function(err, doc)
				{
				  	if (err){
				  		// error occured since _id=1 already existed
				    	duplicates++;
				  	}
				  	else{  
				  		// no error, inserted new document, with _id=1
				  		added++;
				  	}
				});
			}
		  	callback(added);
		};
		usingItNow(myCallback,tweets_to_add);
	  }
	});
};


function dateToDate(input){

	var date = input.split(' ');
	var output = date[1]+' '+date[2]+' '+date[5]+' '+date[3]+' '+date[4];
	
	return output;
}