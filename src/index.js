import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import getStore from './getStore';

import history from './core/history';

import './index.css';
import './assets/sass/style.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = getStore();

const app = (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App} />
        </Router>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
