import React from 'react';
import {Row, Col} from 'react-bootstrap';

export default React.createClass({
    render() {
        return (
            <div className="tweets">
                {this.props.tweets.map((tweet) => {
                    return (
                        <Row className="tweets__container animated fadeInLeft" key={tweet.tweet_id}>
                            <Col sm={2}>
                                <img className="tweets__container__image" src={tweet.tweet_picture}/>
                            </Col>
                            <Col sm={10} className="tweets__container__text">{tweet.tweet_text}</Col>
                        </Row>
                    )
                })}
            </div>
        );
    }
})
