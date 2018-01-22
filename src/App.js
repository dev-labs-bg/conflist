import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Wrapper from './common/Wrapper';
import EventDetails from './Events/Details';
import HomePage from './Home';
import Login from './Login';
import Gate from './Gate';

class App extends Component {
    render() {
        const isAuthenticated = this.props.auth.isAuthenticated;
        console.log(isAuthenticated);
        console.log(this.props.auth.isAuthenticated);

        if (isAuthenticated) {
            return (
                <div>
                    <Wrapper auth={this.props.auth.isAuthenticated}>
                        <Switch>
                            <Route path="/home" component={HomePage} />
                            <Route path="/event" component={EventDetails} />
                        </Switch>
                    </Wrapper>
                </div>
            );
        }

        return (
            <div>
                <Wrapper auth={this.props.auth.isAuthenticated}>
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/home" component={HomePage} />
                        <Route path="/event" component={EventDetails} />
                        <Route path="/login" component={Login} />
                        <Route path="/gate" component={Gate} />
                    </Switch>
                </Wrapper>
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        auth,
    };
};

export default connect(mapStateToProps)(App);
