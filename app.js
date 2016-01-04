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
var mongo           = require('./routes/mongodb');
var getTweets       = require('./routes/getTweets');
var searchTweets    = require('./routes/searchTweetsBy');

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
//app.use('/api', tweets);
//var connect = mongo();
var top = -1;
//mongo(tweets,top);


//code for tweets and hashtags
setInterval(function() {
    //mongo(tweets,top);
}, 30 * 1000); // wait 60 seconds



//handle load_tweets on page
var last_get=0;

if (app.post('/load_tweets', function(req, res) {
    console.log('Load_tweets triggered!');
    getTweets(res);
}));


if (app.post('/db_options', function(req, res) {
    console.log('Database option received');

    var recHashtag = null;

    if( req.body.search != '')
    {
        console.log(req.body.search);
        searchTweets(req.body.search);
    }
    if( req.body.text != '')
    {
        console.log(req.body.text);
        searchTweets(req.body.text);
    }
    if( req.body.user != '')
    {
        console.log(req.body.user);
        searchTweets(req.body.user);
    }
    if( req.body.hashtag != '')
    {
        if (req.body.hashtag[0] != '#')
          req.body.hashtag = '#'+req.body.hashtag;

        console.log(req.body.hashtag);
        searchTweets(req.body.hashtag);
    }
    if( req.body.dateFrom != '')
    {
        console.log(req.body.dateFrom);
        searchTweets(req.body.dateFrom);
    }
    if( req.body.dateTo != '')
    {
        console.log(req.body.dateTo);
        searchTweets(req.body.dateTo);
    }

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
