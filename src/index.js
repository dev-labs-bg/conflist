import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router } from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import eventsReducer from './Events/InfiniteScrollList/duck';
import eventReducer from './Events/Details/duck';
import authReducer from './Login/duck';
import wishListReducer from './Events/WishList/duck';
import currentUserReducer from './ProfileSettings/duck';
import searchReducer from './Search/duck';
import searchListReducer from './Events/SearchList/duck';
import subscriptionsReducer from './MySubscriptions/duck';
import speakerEvents from './Events/Speakers/duck';
import calendarEvents from './Events/CalendarList/duck';
import history from './core/history';

import './index.css';
import './assets/sass/style.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [];
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
    calendarEvents,
});

let store;
// disable redux-logger and redux dev tools in production mode
if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger');
    middlewares.push(logger);
    store = createStore(reducer, composeEnhancers(applyMiddleware(...middlewares)));
} else {
    store = createStore(reducer, applyMiddleware(...middlewares));
}

export default store;

const app = (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App} />
        </Router>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
