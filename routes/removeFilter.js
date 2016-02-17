var express         = require('express');


module.exports = function (query,res)
{
	var mongodb 	= require('mongodb');
	var router 		= express.Router();

	var MongoClient = mongodb.MongoClient;
	var url = 'mongodb://localhost:27017/twfDB';
	MongoClient.connect(url, function (err, db) {
		
		if (err) {
			console.log('Unable to connect to the mongoDB server. Error:', err);
		} 
		else 
		{
			if (query == 'all')
			{
				db.collection('tweets').deleteMany({ },function(err, results) {
					if (err)
						console.log('Unable to remove '+query+' from database');
					else
						res.end();
					db.close();
			    });
			}
			else
			{
				db.collection('tweets').deleteMany({ filter : query },function(err, results) {
					if (err)
						console.log('Unable to remove '+query+' from database');
					else
						res.end();
					db.close();
			    });
			}	
		}
	});
}