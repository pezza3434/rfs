import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/index';
import Tweets from '../components/tweets';

const mapState = ({tweets, loading}) => {
    return {
        tweets,
        loading
    }
}

const mapDispatch = (dispatch) => {
    return bindActionCreators({
        ...appActions
    }, dispatch);
}

const component = React.createClass({
    componentDidMount() {
        this.props.requestTweets();
    },

    render() {
        return (
            <div className="container">
                {this.props.tweets ? <Tweets addTweetAction={this.props.addTweet} tweets={this.props.tweets.body}/> : ''}
            </div>
        )
    }
});

export default connect(mapState, mapDispatch)(component)
