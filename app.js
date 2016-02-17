var express         = require('express');
var path            = require('path');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var mustacheExpress = require('mustache-express');
var bcrypt          = require('bcryptjs');
var session         = require('client-sessions');
var mongodb         = require('mongodb');

var index                     = require('./routes/index');
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
var login                     = require('./routes/login');

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

app.use(session({
  cookieName : 'session',
  secret     : 'ak*jck%1kh$31ofu%^d23u1o!@jsdkjcsd',
  duration   : 30*60*1000,
  activeDuration: 5*60*1000,
}));

//Refresh Mongo DB Entries
//refresh_db(searchTweets,addTweets);
setInterval(function() {
    //refresh_db(searchTweets,addTweets);
}, 60 * 4000); // wait 60 seconds * 1 minutes

var allTweets_cnt = 1;  //cnt for allTweets       page to load more and skip 'allTweets_cnt'  entries
var filters_cnt   = 1;  //cnt for filters         page to load more and skip 'filters_cnt'    entries
var search_cnt    = 1;  //cnt for searchKeyWord   page to load more and skip 'search_cnt'     entries
var User = {'username' : '' , 'password' : '', 'email': ''};

// Handle Pages
app.use('/', index);                                        

app.post('/signup_user',signup_user);

app.post('/login', function(req , res , next){
  var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/twfDB';
    MongoClient.connect(url, function (err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
        console.log('Connection established to', url);
        db.collection('Users').find({ 'username' : req.body.username }).toArray( function(err, user)
        {
          if (err){
            console.log('Error trying to login. User \''+req.body.username+'\'');
            res.redirect('/');
            db.close();
          }
          else{
            if (user.length == 1)
            {
              if (bcrypt.compareSync( req.body.password , user[0].password))
              {
                console.log('User \''+req.body.username+'\' logged in successfully');
                db.collection('tweets').distinct( 'filter'  ,function(err, filter_options)
                {
                  if (err)
                    console.log('Error at distinct');
                  else
                  {
                    req.session.user = user[0];
                    res.redirect('home');
                    db.close();
                  }
                });
              }
              else{
                console.log('Error trying to login. User \''+req.body.username+'\''+','+req.body.password);
                res.redirect('/');
                db.close();
              }
            }
            else
            {
              console.log('Error trying to login. User \''+req.body.username+'\''+','+req.body.password);
              res.redirect('/');
              db.close();
            }
          }
        });
      }
    });
});

app.use('/logout',function(req , res , next){
  req.session.reset();
  res.redirect('/');
});

app.use('/home',function(req , res , next){
  console.log('Home!');

  var MongoClient = mongodb.MongoClient;
  var url = 'mongodb://localhost:27017/twfDB';
  MongoClient.connect(url, function (err, db) 
  {
    if (err) 
    {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } 
    else 
    {
      console.log('Connection established to', url);
      if (req.session && req.session.user)
      {
        db.collection('Users').find({ 'username' : req.session.user.username }).toArray( function(err, user)
        {
          if (user.length==0)
          {
            req.session.reset();
            res.redirect('/');
          }
          else
          {
            res.locals.user = user[0];
            db.collection('tweets').distinct( 'filter'  ,function(err, filter_options)
            {
              if (err)
                console.log('Error at distinct');
              else
              {
                res.render('home', { 'load_options':  filter_options , title: 'Twitter Feed' , user:req.session.user.username });
                db.close();
              }
            });
          }
        });
      }
      else
      {
        res.redirect('/');
      }
    }
  });
});

app.use(function(req , res , next){
  if (req.session && req.session.user)
  {
    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/twfDB';
    MongoClient.connect(url, function (err, db) 
    {
      if (err) 
      {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } 
      else 
      {
        console.log('Connection established to', url);
          db.collection('Users').find({ 'username' : req.session.user.username }).toArray( function(err, user)
          {
            if ((user.length>0)&&(user!=undefined))
            {
              req.user = user[0];
              req.session.user = user[0];
            }
            next();
          });
      }
    });
  }
  else
  {
    next();
  }
});

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
