import { Route } from 'react-router';
import React from 'react';
import App from '../src/containers/index.jsx';

const routes = (
    <Route component={App} name='app' path='/'>
    </Route>
);

module.exports = routes;
