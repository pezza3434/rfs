if (typeof window !== 'undefined') {
    require('./style.scss');
}

import React from 'react';
import {Link} from 'react-router';
import {Row} from 'react-bootstrap';

export default React.createClass({
    render() {
        return (
            <Row className="navigation">
                <ul>
                    <li><Link to="/list">Feed</Link></li>
                    <li><Link to="/list/personal">Saved feed</Link></li>
                </ul>
            </Row>
        );
    }
});
