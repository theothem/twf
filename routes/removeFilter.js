var express         = require('express');
var mysql           = require('mysql');
var session         = require('client-sessions');


module.exports = function (query,req,res)
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
	        res.redirect('/home');
	        return;  
	    }
	});	

	if (query == 'all')
	{
		connection.query('DELETE FROM Belongs WHERE Belongs.username=\''+req.session.user.username+'\';',function(err, user) 
	  	{
	  		if (err)
	  			console.log('Could not delete all filters'+err);
	  		res.end();
	  	});
	}
	else
	{
		connection.query('DELETE FROM Belongs WHERE Belongs.filter = \''+ query +'\' AND Belongs.username = \''+req.session.user.username+'\'',function(err, user) 
	  	{
	  		if (err)
	  			console.log('Could not delete filter \''+query+'\''+' '+err);
	  		res.end();
	  	});
	}
}