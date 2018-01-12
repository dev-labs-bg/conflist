import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Wrapper from './common/Wrapper';
import EventDetails from './Events/Details';
import HomePage from './Home';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Wrapper>
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/event" component={EventDetails} />
                    </Switch>
                </Wrapper>
            </div>
        );
    }
}

export default App;
