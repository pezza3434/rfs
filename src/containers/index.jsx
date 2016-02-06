import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/index';
import Template from '../components/template';

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
            <div>
                <Template/>
                {this.props.number}
                Container component
                <button onClick={this.props.addNumber.bind(null, 2)}> Click meeeee</button>
            </div>
        )
    }
});

export default connect(mapState, mapDispatch)(component)
