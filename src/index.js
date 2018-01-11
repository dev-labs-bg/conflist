import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, } from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import conferenceReducer from './EventsHandling/conference';
import eventReducer from './InsidePage/conferenceInside';

import './index.css';
import './assets/sass/style.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    conference: conferenceReducer,
    event: eventReducer,
});

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <Route path="/" component={App} />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render( app, document.getElementById('root'));
registerServiceWorker();
