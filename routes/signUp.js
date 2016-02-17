var express 	= require('express');
var router 		= express.Router();
var mongodb     = require('mongodb');
var bcrypt      = require('bcryptjs');

module.exports = function (req , res , next)
{
    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/twfDB';
    MongoClient.connect(url, function (err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
        console.log('Connection established to', url);
        var hash = bcrypt.hashSync(req.body.password , bcrypt.genSaltSync(10));
        db.collection('Users').insert(  {'username' : req.body.username , 'password': hash , 'email': req.body.email }  ,function(err, doc)
        {
          if (err){
            console.log('Error adding user \''+req.body.username+'\'');
            res.json('index',{title:'Twitter Feed' , 'error': 'error'});
            db.close();
          }
          else{
          	console.log('User added : '+req.body.username+','+req.body.email);
          	res.json('index',{title:'Twitter Feed','error': req.body.username});
            db.close();
          }
        });
      }
    });
};


