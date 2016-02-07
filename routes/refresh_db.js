var express         = require('express');

module.exports = function (searchTweets,addTweets)
{	
	var mongodb 	= require('mongodb');
	var MongoClient = mongodb.MongoClient;
	var url = 'mongodb://localhost:27017/twfDB';
	MongoClient.connect(url, function (err, db) 
	{	
		if (err) {
			console.log('Unable to connect to the mongoDB server. Error:', err);
		} 
		else 
		{
			db.collection('tweets').distinct( 'filter'  ,function(err, filters){
				if (err)
				{
					console.log('Error updating database.');
				}
				else
				{
					console.log('Update Database...');
					db.close();
					for (var i=0;i<filters.length;i++)
					{
						if (filters[i][0] == '@')
						{
							var user = filters[i].split('@');
							var myCallback = function(data) {
					          //insert data
					          if (data.length<=200)
					          {
					          	var filt = ("@"+user[1]);
					          	addTweets(null,data,filt);
					          }
					        };
					        searchTweets(user[1],myCallback,0,0,1);
						}
						else if (filters[i][0] == '#')
						{
							var hashtag = filters[i].split('#');
						}
						else
						{
							var text = filters[i];
						}
					}
				}
			});
		}
	});
}