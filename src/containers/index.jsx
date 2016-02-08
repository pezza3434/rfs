if (typeof window !== 'undefined') {
    require('../bootstrap-grid.scss');
    require('../globalStyles.scss');
}

import React from 'react';
import Navigation from '../components/navigation/index.jsx';
import {Grid, Row, Col} from 'react-bootstrap';

export default React.createClass({
    render() {
        return (
            <Grid>
                <Row className="title">
                    <Col md={12}>
                        Save tweets you like from #requestforstartup
                    </Col>
                </Row>
                {this.props.location.pathname === '/' ? '' : <Navigation/>}
                {this.props.children}
            </Grid>
        )
    }
})
