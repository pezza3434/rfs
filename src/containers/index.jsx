if (typeof window !== 'undefined') {
    require('../bootstrap-grid.scss');
    require('../globalStyles.scss');
}

import React from 'react';
import Navigation from '../components/navigation/index.jsx';
import {Grid} from 'react-bootstrap';

export default React.createClass({
    render() {
        return (
            <Grid>
                {this.props.location.pathname === '/' ? '' : <Navigation/>}
                {this.props.children}
            </Grid>
        )
    }
})
