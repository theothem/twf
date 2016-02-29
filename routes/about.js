var express   		= require('express');
var router    		= express.Router();
var getTweets   	= require('./getTweets');
var mysql           = require('mysql');
var session         = require('client-sessions');

/* GET home page. */
module.exports = function (req , res , next)
{
	res.render('about', { title: 'About' , user:req.session.user.username});
};

