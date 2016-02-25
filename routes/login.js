var express         = require('express');
var router          = express.Router();
var bcrypt          = require('bcryptjs');
var mysql           = require('mysql');
var session         = require('client-sessions');

module.exports = function (req , res , next)
{

  if ((req.body.username == 'Username')||(req.body.username == '')||(req.body.username.length < 4)||(req.body.username.indexOf('<script') > -1)||((req.body.username.indexOf('</script') > -1)))
  {
      res.redirect('/');
      return;
  }
  if ((req.body.password == 'Password')||(req.body.password == '')||( /[^a-zA-Z0-9]/.test( req.body.password ))||(req.body.password.length < 6)||(req.body.password.indexOf('<script') > -1)||(req.body.password.indexOf('</script') > -1))
  {
      res.redirect('/');
      return;
  }

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


