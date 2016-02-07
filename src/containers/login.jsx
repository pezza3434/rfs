import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/index';

import Login from '../components/login/index';

const mapState = ({number}) => {
    return {
        number
    }
}

const mapDispatch = (dispatch) => {
    return bindActionCreators({
        ...appActions
    }, dispatch);
}

const component = React.createClass({
    render() {
        return (
            <div className="container">
                <Login/>
            </div>
        )
    }
});

export default connect(mapState, mapDispatch)(component)
