var express         = require('express');
var router          = express.Router();
var mongodb         = require('mongodb');
var bcrypt          = require('bcryptjs');

module.exports = function (req , res , next,session)
{
    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/twfDB';
    MongoClient.connect(url, function (err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
        console.log('Connection established to', url);
        db.collection('Users').find({ 'username' : req.body.username }).toArray( function(err, user)
        {
          if (err){
            console.log('Error trying to login. User \''+req.body.username+'\'');
            res.redirect('/');
            db.close();
          }
          else{
            if (user.length == 1)
            {
              if (bcrypt.compareSync( req.body.password , user[0].password))
              {
                console.log('User \''+req.body.username+'\' logged in successfully');
                db.collection('tweets').distinct( 'filter'  ,function(err, filter_options)
                {
                  if (err)
                    console.log('Error at distinct');
                  else
                  {
                    res.redirect('home');
                    db.close();
                  }
                });
              }
              else{
                console.log('Error trying to login. User \''+req.body.username+'\''+','+req.body.password);
                res.redirect('/');
                db.close();
              }
            }
            else
            {
              console.log('Error trying to login. User \''+req.body.username+'\''+','+req.body.password);
              res.redirect('/');
              db.close();
            }
          }
        });
      }
    });
};


