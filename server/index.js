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

var env = process.env.NODE_ENV || 'development';
var config = require('./config/config')[env];

// view engine setup
app.set('views', path.join(__dirname, ''));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

var oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    config.consumerKey,
    config.consumerSecret,
    '1.0A',
    null,
    'HMAC-SHA1'
);

app.use(bodyParser.json());

app.use(session({
    secret: 'keyboard cat'
}))

passport.use(new TwitterStrategy({
        consumerKey: config.consumerKey,
        consumerSecret: config.consumerSecret,
        callbackURL: config.callbackURL
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

if (process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack');
    const webpackConfig = require('../webpack.config');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const compiler = webpack(webpackConfig);

    app.use(webpackDevMiddleware(compiler));
    app.use(webpackHotMiddleware(compiler));
}


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
            const parsedData = JSON.parse(data);

            const tweetIds = parsedData.statuses.map((tweet) => {
                return {tweet_id: tweet.id};
            });

            models.tweets
            .findAll({where: {$or: tweetIds}})
            .then((matches) => {
                const previouslySavedTweets = matches.map((match) => {
                    return parseInt(match.tweet_id, 10);
                });

                const dataToReturn = parsedData.statuses.map((status) => {
                    if (previouslySavedTweets.indexOf(status.id) > -1) {
                        status.previouslySaved = true;
                    }
                    return status;
                });

                res.json(dataToReturn);
            })

        });
});

app.post('/api/tweet', function (req, res, next) {
    models.tweets.create({
        tweet_id: req.body.tweetId,
        twitter_user_id: req.user.id,
        tweet_text: req.body.tweetText,
        tweet_picture: req.body.tweetPicture,
        tweet_id: req.body.tweetId
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
