import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Wrapper from './common/Wrapper';
import InsidePage from './InsidePage/InsidePage';
import HomePage from './HomePage';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Wrapper>
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/event" component={InsidePage} />
                    </Switch>
                </Wrapper>
            </div>
        );
    }
}

export default App;
