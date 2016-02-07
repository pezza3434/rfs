import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/index';

import PersonalTweets from '../components/personalTweets/index';

const mapState = ({personalTweets}) => {
    return {
        personalTweets
    }
}

const mapDispatch = (dispatch) => {
    return bindActionCreators({
        ...appActions
    }, dispatch);
}

const component = React.createClass({
    componentDidMount() {
        this.props.getPersonalTweets();
    },
    render() {
        return (
            <div className="container">
                {this.props.personalTweets ? <PersonalTweets tweets={this.props.personalTweets.body}/> : ''}
            </div>
        )
    }
});

export default connect(mapState, mapDispatch)(component)
