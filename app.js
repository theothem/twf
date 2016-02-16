var express         = require('express');
var path            = require('path');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var mustacheExpress = require('mustache-express');

var routes                    = require('./routes/index');
var home                      = require('./routes/home');
var allTweets                 = require('./routes/allTweets');
var tweets                    = require('./routes/tweets');
var hashtags                  = require('./routes/hashtags');
var getTweets                 = require('./routes/getTweets');
var searchTweets              = require('./routes/searchTweetsBy');
var addTweets                 = require('./routes/addTweets');
var remove_filter             = require('./routes/removeFilter');
var filterByUser              = require('./routes/filterByUser');
var filterByHashtag           = require('./routes/filterByHashtag');
var searchKeyWord             = require('./routes/searchKeyWord');
var refresh_db                = require('./routes/refresh_db');
var filterByHashtag_loadMore  = require('./routes/filterByHashtag_loadMore');
var searchKeyWord_loadMore    = require('./routes/searchKeyWord_loadMore');
var signup_user               = require('./routes/signUp');

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

// Handle Pages
app.use('/', routes);
app.use('/home', home);
app.use('/allTweets',function(req,res,next){
  allTweets_cnt = 1;
  filters_cnt   = 1;
  search_cnt    = 1;

  allTweets(req,res,next);
});

app.use('/filters/', function(request, response, next) {
  var query     = require('url').parse(request.url,true).query;
  var users     = query.users;
  var hashtags  = query.hashtags;
  var date      = query.date;

  allTweets_cnt = 1;
  filters_cnt   = 1;
  search_cnt    = 1;

  filterByHashtag(users,hashtags,date,response,"filters",query.order);
});

app.use('/searchKeyWord/', function(request, response, next) {
  var query     = require('url').parse(request.url,true).query;
  var search    = query.search;
  var users     = query.users;
  var hashtags  = query.hashtags;
  var date      = query.date;

  allTweets_cnt = 1;
  filters_cnt   = 1;
  search_cnt    = 1;

  searchKeyWord(search,users,hashtags,date,response,"searchKeyWord",query.order);
});

// End - Handle Pages


//Refresh Mongo DB Entries

//refresh_db(searchTweets,addTweets);
//code for tweets and hashtags
setInterval(function() {
    //refresh_db(searchTweets,addTweets);
}, 60 * 4000); // wait 60 seconds * 1 minutes
// End - Refresh Mongo DB Entries

var allTweets_cnt = 1;  //cnt for allTweets       page to load more and skip 'allTweets_cnt'  entries
var filters_cnt   = 1;  //cnt for filters         page to load more and skip 'filters_cnt'    entries
var search_cnt    = 1;  //cnt for searchKeyWord   page to load more and skip 'search_cnt'     entries

//Load More 
if (app.post('/load_search_tweets', function(req, res,data) {
    var query     = require('url').parse(req.url,true).query;
    var search    = query.search;
    var users     = query.users;
    var hashtags  = query.hashtags;
    var date      = query.date;

    allTweets_cnt = 1;
    filters_cnt   = 1;

    searchKeyWord_loadMore(search,users,hashtags,date,res,"searchKeyWord",query.order,20*search_cnt++);
    console.log('Load_search_tweets triggered! '+req.query.order);
}));

if (app.post('/load_filter_tweets', function(req, res,data) {
    var query     = require('url').parse(req.url,true).query;
    var users     = query.users;
    var hashtags  = query.hashtags;
    var date      = query.date;

    console.log('Load_filter_tweets triggered! '+users+','+hashtags+','+date);
    filterByHashtag_loadMore(users,hashtags,date,res,"filters",query.order,20*filters_cnt++);
}));

if (app.post('/load_tweets', function(req, res,data) {
    console.log('Load_tweets triggered! '+req.query.order);
    getTweets(res,'allTweets',req.query.order,20*allTweets_cnt++);
}));
// End - Load More

// Edit Mongo DB
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
    allTweets_cnt = 1;
    console.log('Remove_filter : '+req.body.filter);
    remove_filter(req.body.filter,res);
}));

//add user to mongo DB
if (app.post('/signup_user',signup_user));
//End - Edit Mongo DB


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
