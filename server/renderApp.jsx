import ReactDOM from 'react-dom/server';
import {match, RoutingContext} from 'react-router';
import routes from '../src/routes';
import React from 'react';
import { Provider } from 'react-redux'
import store from '../src/store';

module.exports = (req, res, next) => {

    match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
        var html = ReactDOM.renderToString(
            <Provider store={store} key="provider">
                <RoutingContext {...renderProps}/>
            </Provider>
        );

        res.render('index.hbs', {
            html: html
        });
    });

}
