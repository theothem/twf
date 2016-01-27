var express 		= require('express');
var router 			= express.Router();
var filterByUser   	= require('./filterByUser');

/* GET home page. */
router.get('/:user', function(request, response, next) {
  var username = request.query;
    console.log(username);
});

module.exports = router;