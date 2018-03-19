import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import eventsReducer from './Events/List/duck';
import eventReducer from './Events/Details/duck';
import authReducer from './Login/duck';
import wishListReducer from './Events/WishList/duck';
import currentUserReducer from './ProfileSettings/duck';
import searchReducer from './Search/duck';
import searchListReducer from './Events/SearchList/duck';
import subscriptionsReducer from './MySubscriptions/duck';
import speakerEvents from './Events/Speakers/duck';

import './index.css';
import './assets/sass/style.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [];

// disable redux-logger in production mode
if (process.env.NODE_ENV === 'development') {
    const { logger } = require(`redux-logger`);
    middlewares.push(logger);
}
middlewares.push(thunk);

const reducer = combineReducers({
    events: eventsReducer,
    event: eventReducer,
    auth: authReducer,
    wishList: wishListReducer,
    user: currentUserReducer,
    search: searchReducer,
    searchList: searchListReducer,
    subscriptions: subscriptionsReducer,
    speakerEvents,
});


const store = createStore(reducer, composeEnhancers(applyMiddleware(...middlewares)));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <Route path="/" component={App} />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
