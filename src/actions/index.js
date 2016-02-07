export const REQUEST_TWEETS = 'REQUEST_TWEETS';
export const REQUEST_TWEETS_SUCCESS = 'REQUEST_TWEETS_SUCCESS';
export const REQUEST_TWEETS_ERROR = 'REQUEST_TWEETS_ERROR';

export const ADD_TWEET = 'ADD_TWEET';
export const ADD_TWEET_SUCCESS = 'ADD_TWEET_SUCCESS';
export const ADD_TWEET_ERROR = 'ADD_TWEET_ERROR';

export const REQUEST_PERSONAL_TWEETS = 'REQUEST_PERSONAL_TWEETS';
export const REQUEST_PERSONAL_TWEETS_SUCCESS = 'REQUEST_PERSONAL_TWEETS_SUCCESS';
export const REQUEST_PERSONAL_TWEETS_ERROR = 'REQUEST_PERSONAL_TWEETS_ERROR';

const request = require('superagent');

export function requestTweets() {
    return function (dispatch) {
        dispatch({
            type: REQUEST_TWEETS
        });
        request
        .get('/api/tweets')
        .end((err, res) => {
            if (err) {
                return dispatch({
                    type: REQUEST_TWEETS_ERROR,
                    error: err
                })
            }

            dispatch({
                type: REQUEST_TWEETS_SUCCESS,
                payload: res
            });
        })
    }
}

export function addTweet(tweet) {
    return function (dispatch) {
        dispatch({
            type: ADD_TWEET
        });
        request
        .post('/api/tweet')
        .send({tweetText: tweet.text, tweetPicture: tweet.user.profile_image_url.replace('_normal', '_bigger')})
        .end((err, res) => {
            if (err) {
                return dispatch({
                    type: ADD_TWEET_ERROR,
                    error: err
                })
            }

            dispatch({
                type: ADD_TWEET_SUCCESS,
                payload: res
            });
        })
    }
}

export function getPersonalTweets() {
    return function (dispatch) {
        dispatch({
            type: REQUEST_PERSONAL_TWEETS
        });
        request
        .get('/api/savedtweets')
        .end((err, res) => {
            if (err) {
                return dispatch({
                    type: REQUEST_PERSONAL_TWEETS_ERROR,
                    error: err
                })
            }

            dispatch({
                type: REQUEST_PERSONAL_TWEETS_SUCCESS,
                payload: res
            });
        })
    }
}
