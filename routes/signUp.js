var express     = require('express');
var router      = express.Router();
var bcrypt      = require('bcryptjs');
var mysql       = require('mysql');

module.exports = function (req , res , next)
{

  if ((req.query.username == 'Username')||(req.query.username == '')||(req.query.username.length < 4)||(req.query.username.indexOf('<script') > -1)||((req.query.username.indexOf('</script') > -1)))
  {
      res.json('index',{title:'Twitter Feed' , 'error': 'Error adding \''+req.query.username+'\' to DataBase'});
      return;
  }
  if ((req.query.password == 'Password')||(req.query.password == '')||( /[^a-zA-Z0-9]/.test( req.query.password ))||(req.query.password.length < 6)||(req.query.password.indexOf('<script') > -1)||(req.query.password.indexOf('</script') > -1))
  {
      res.json('index',{title:'Twitter Feed' , 'error': 'Error adding \''+req.query.username+'\' to DataBase'});
      return;
  }
  if ((req.query.email == 'Email') || (req.query.email == '' ) || (req.query.email.indexOf('.') < 0) || (req.query.email.indexOf('@') < 0 ))
  {
      res.json('index',{title:'Twitter Feed' , 'error': 'Error adding \''+req.query.username+'\' to DataBase'});
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
        res.json('index',{title:'Twitter Feed' , 'error': 'Error connecting database'});
        return;
    }
  });

  var hash = bcrypt.hashSync(req.query.password , bcrypt.genSaltSync(10));
  var user = {
    username : req.query.username,
    password : hash,
    email    : req.query.email
  };

  var query = connection.query('insert into users set ?', user , function(err,result) {
    if (!err){
      console.log('User added : '+req.query.username+','+req.query.email);
      res.json('index',{title:'Twitter Feed','error': 'User \''+req.query.username+'\' added to DataBase'});
    }
    else{
      console.log('Error while performing Query.'+err);
      res.json('index',{title:'Twitter Feed' , 'error': 'Error adding \''+req.query.username+'\' to DataBase'});
    }
  });

  connection.end();
};


