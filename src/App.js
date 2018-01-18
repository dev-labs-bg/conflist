import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Wrapper from './common/Wrapper';
import EventDetails from './Events/Details';
import HomePage from './Home';
import Login from './Login';
import Gate from './Gate';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Wrapper>
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/home" exact component={HomePage} />
                        <Route path="/event" component={EventDetails} />
                        <Route path="/login" component={Login} />
                        <Route path="/gate" component={Gate} />
                    </Switch>
                </Wrapper>
            </div>
        );
    }
}

export default App;
