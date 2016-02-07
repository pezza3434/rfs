const initialState = {
    tweets: false,
    loading: false,
    personalTweets: false
};

export default function reducer(state = initialState, action) {

    if (action.type === 'REQUEST_TWEETS') {
        return Object.assign({}, state, {loading: true})
    }

    if (action.type === 'REQUEST_TWEETS_SUCCESS') {
        return Object.assign({}, state, {tweets: action.payload, loading: false});
    }

    if (action.type === 'REQUEST_PERSONAL_TWEETS_SUCCESS') {
        return Object.assign({}, state, {personalTweets: action.payload, loading: false});
    }

    return state;
}
