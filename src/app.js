import ReactDOM from 'react-dom';
import React from 'react'; //eslint-disable-line
import routes from './routes.jsx';
import history from './history';
import {Router} from 'react-router';
import store from './store';
import { Provider } from 'react-redux' 

ReactDOM.render(<Provider store={store}><Router history={history}>{routes}</Router></Provider>, document.getElementById('app-container'));
