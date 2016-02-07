import { Route, IndexRoute } from 'react-router';
import React from 'react';
import Login from '../src/containers/login.jsx';
import List from '../src/containers/list.jsx';
import Index from '../src/containers/index.jsx';
import Personal from '../src/containers/personal.jsx';

const routes = (
    <Route component={Index} name='app' path='/'>
        <IndexRoute component={Login}/>
        <Route name='list' path='list' component={List}/>
        <Route name='personal' path='list/personal' component={Personal}/>
    </Route>
);

module.exports = routes;
