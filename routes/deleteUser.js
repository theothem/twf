var express 	= require('express');
var mysql       = require('mysql');
var session     = require('client-sessions');
var router 		= express.Router();

router.get('/', function(req, res, next) {
	if (req.session && req.session.user)
	{
		//console.log(req.session.user.username);
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

		connection.query('DELETE FROM users WHERE users.username=\''+req.session.user.username+'\';' ,function(err, filters) 
  		{
  			if (err){
  				console.log(err);
  				res.redirect('/');
  			}
			else{
				console.log('User '+req.session.user.username+' completely deleted');
				req.session.reset();
  				res.redirect('/');
  			}
  		});
		connection.end();
	}
	else
	{
		console.log('Failed to delete User '+req.session.user.username+'. User has not logged in');
		res.redirect('/');
		return;
	}
});

module.exports = router;