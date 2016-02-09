var express         = require('express');
var path            = require('path');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var mustacheExpress = require('mustache-express');

var routes          = require('./routes/index');
var allTweets       = require('./routes/allTweets');
var tweets          = require('./routes/tweets');
var hashtags        = require('./routes/hashtags');
var getTweets       = require('./routes/getTweets');
var searchTweets    = require('./routes/searchTweetsBy');
var addTweets       = require('./routes/addTweets');
var remove_filter   = require('./routes/removeFilter');
var filterByUser    = require('./routes/filterByUser');
var filterByHashtag = require('./routes/filterByHashtag');
var searchKeyWord   = require('./routes/searchKeyWord');
var refresh_db      = require('./routes/refresh_db');

var app             = express(); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/allTweets',allTweets);
//app.use('/users/:user',users);

app.use('/filters/', function(request, response, next) {
  var query     = require('url').parse(request.url,true).query;
  var users     = query.users;
  var hashtags  = query.hashtags;
  var date      = query.date;

  filterByHashtag(users,hashtags,date,response,"filters");
});

app.use('/searchKeyWord/', function(request, response, next) {
  var query     = require('url').parse(request.url,true).query;
  var search    = query.search;
  var users     = query.users;
  var hashtags  = query.hashtags;
  var date      = query.date;

  searchKeyWord(search,users,hashtags,date,response,"searchKeyWord");
});

//app.use('/api', tweets);

//refresh_db(searchTweets,addTweets);
//code for tweets and hashtags
setInterval(function() {
    //refresh_db(searchTweets,addTweets);
}, 60 * 1000); // wait 60 seconds * 1 minutes


if (app.post('/load_tweets', function(req, res) {
    console.log('Load_tweets triggered!');
    getTweets(res);
}));

if (app.post('/db_options', function(req, res) {
    console.log('Database option received');

    if( req.body.text != '')
    {
        //console.log(req.body.text);
        var myCallback = function(data) {
          //insert data
          if( req.body.dateFrom != '')
            addTweets(res,data,req.body.text,req.body.dateFrom);
          else
            addTweets(res,data,req.body.text,null);
        };
        if( req.body.dateFrom != '')
          searchTweets(req.body.text,myCallback,1,req.body.dateFrom,0);
        else
          searchTweets(req.body.text,myCallback,0,0,0);
    }
    if( req.body.user != '')
    {
        //console.log(req.body.user);
        var myCallback = function(data) {
          //insert data
          var filt = ("@"+req.body.user);
          addTweets(res,data,filt,null);
        };
        searchTweets(req.body.user,myCallback,0,0,1);
    }
    if( req.body.hashtag != '')
    {
        if (req.body.hashtag[0] != '#')
          req.body.hashtag = '#'+req.body.hashtag;

        var myCallback = function(data) {
          //insert data
          if( req.body.dateFrom != '')
            addTweets(res,data,req.body.hashtag,req.body.dateFrom);
          else
            addTweets(res,data,req.body.hashtag,null);
        };
        if( req.body.dateFrom != '')
          searchTweets(req.body.hashtag,myCallback,1,req.body.dateFrom,0);
        else
          searchTweets(req.body.hashtag,myCallback,0,0,0);
    }
}));

if (app.post('/remove_filter', function(req, res) {
    console.log('Remove_filter : '+req.body.filter);
    remove_filter(req.body.filter,res);
}));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
