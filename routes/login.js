var express         = require('express');
var router          = express.Router();
var mongodb         = require('mongodb');
var bcrypt          = require('bcryptjs');
var mysql           = require('mysql');
var session         = require('client-sessions');

module.exports = function (req , res , next)
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
        res.redirect('/');
        return;
    }
  });

  connection.query('SELECT * FROM users WHERE username = ?', req.body.username ,function(err, user) 
  {
    connection.end();
    if (!err){
      //console.log('The solution is: ', rows);
      if (user.length == 1)
      {
        if (bcrypt.compareSync( req.body.password , user[0].password))
        {
          //get filters
          console.log('Logged in correctly '+user[0].username);
          req.session.user = user[0];
          res.redirect('home');
        }
        else
        {
          console.log('Error trying to login. User \''+req.body.username+'\''+','+req.body.password);
          res.redirect('/');
        }
      }
      else
      {
        console.log('Error trying to login. User \''+req.body.username+'\''+','+req.body.password);
        res.redirect('/');
      }
    }
    else
      console.log('Error while performing Query.');
  });
};


