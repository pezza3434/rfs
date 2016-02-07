if (typeof window !== 'undefined') {
    require('./style.scss');
}

import React from 'react';
import store from '../../store/index.js';
import {Row, Col} from 'react-bootstrap';

export default React.createClass({
    render() {
        return (
            <div className="tweets">
                {this.props.tweets.map((tweet) => {
                    return (
                        <Row onClick={this.props.addTweetAction.bind(null,tweet)} className="tweets__container animated fadeInLeft" key={tweet.id}>
                            <Col  sm={2}>
                                <img className="tweets__container__image" src={tweet.user.profile_image_url.replace('_normal', '_bigger')}/>
                            </Col>
                            <Col  sm={10} className="tweets__container__text">{tweet.text}</Col>
                            <Col  sm={10} smOffset={2} className="tweets__container__save"><button className="tweets__container__save__button">Save</button></Col>
                        </Row>
                    )
                })}
            </div>
        );
    }
})
