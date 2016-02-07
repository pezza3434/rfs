require('babel-core/register');

const express = require('express');
const app = express();
const renderApp = require('./renderApp');
const path = require('path');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter');
const session = require('express-session');
var OAuth = require('oauth');
var bodyParser = require('body-parser');
const models = require('./models');

// view engine setup
app.set('views', path.join(__dirname, ''));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const compiler = webpack(webpackConfig);

var oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    'sqnMkZc0i7OuyBpKC3XcjZxDj',
    'xIJTWC7J0A55zAu38EU3cI435PBtcQwrQo2LtzWcqxzZgPglSn',
    '1.0A',
    null,
    'HMAC-SHA1'
);

app.use(bodyParser.json());

app.use(session({
    secret: 'keyboard cat'
}))

passport.use(new TwitterStrategy({
        consumerKey: 'sqnMkZc0i7OuyBpKC3XcjZxDj',
        consumerSecret: 'xIJTWC7J0A55zAu38EU3cI435PBtcQwrQo2LtzWcqxzZgPglSn',
        callbackURL: "http://127.0.0.1:4000/callback"
    },
    function (token, tokenSecret, profile, cb) {
        return cb(null, {
            id: profile.id,
            token: token,
            tokenSecret: tokenSecret
        });

    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

app.use(webpackDevMiddleware(compiler));
app.use(webpackHotMiddleware(compiler));

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/callback',
    passport.authenticate('twitter', {
        failureRedirect: '/failed'
    }),
    function (req, res, next) {
        res.redirect('/list');
    });

app.get('/api/tweets', function (req, res, next) {
    oauth.get(
        'https://api.twitter.com/1.1/search/tweets.json?q=%23requestforstartup&result_type=recent',
        req.user.token, //test user token
        req.user.tokenSecret, //test user secret
        function (e, data, response) {
            res.json(JSON.parse(data));
        });
});

app.post('/api/tweet', function (req, res, next) {
    models.tweets.create({
        tweet_id: req.body.tweetId,
        twitter_user_id: req.user.id,
        tweet_text: req.body.tweetText,
        tweet_picture: req.body.tweetPicture
    }).then(() => {
        res.status(200).json({message: 'Tweet added'});
    }).catch((err) => {
        res.json({error: err});
    });
});

app.get('/api/savedtweets', function (req, res, next) {
    models.tweets
    .findAll({where: {twitter_user_id: req.user.id}})
    .then((data) => {
        res.json(data);
    });
});

app.get('/list', function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
}, renderApp);

app.get('/list/personal', function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
}, renderApp);

app.get('/', function (req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/list');
    } else {
        next();
    }
}, renderApp);

app.use('/favicon.ico', function (req, res, next) {
    res.send('icon');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {

    app.use(function (err, req, res, next) {
        console.log(err)
        console.log(req.url)
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    console.log(err)
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
