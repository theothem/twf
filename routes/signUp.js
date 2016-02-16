var express 	= require('express');
var router 		= express.Router();
var mongodb     = require('mongodb');

module.exports = function (req , res , next)
{
    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/twfDB';
    MongoClient.connect(url, function (err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
        console.log('Connection established to', url);
        db.collection('Users').insert(  {'username' : req.body.username , 'password': req.body.password , 'email': req.body.email }  ,function(err, doc)
        {
          if (err){
            console.log('Error adding user \''+req.body.username+'\'');
            res.json('index',{title:'Twitter Feed1' , 'error': 'error'});
            db.close();
          }
          else{
          	console.log('User added : '+req.body.username+','+req.body.email);
          	res.json('index',{title:'Twitter Feed1','error': req.body.username});
            db.close();
          }
        });
      }
    });
};


