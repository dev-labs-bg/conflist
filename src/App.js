import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Wrapper from './common/Wrapper';
import EventDetails from './Events/Details';
import HomePage from './Home';
import Login from './Login';
import Gate from './Gate';
import ProfileSettings from './ProfileSettings';
import { getToken } from './Login/duck';

class App extends Component {
    static propTypes = {
        auth: PropTypes.shape({
            error: PropTypes.string,
            isAuthenticated: PropTypes.bool,
            token: PropTypes.string,
            isLoading: PropTypes.bool,
        }).isRequired,
        getToken: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getToken();
    }

    render() {
        const { isAuthenticated } = this.props.auth;
        const { isLoading } = this.props.auth;
        const { error } = this.props.auth;

        if (isLoading) {
            return (<p>Loading!</p>);
        }

        if (error !== null) {
            return (
                <div>
                    {error}
                </div>
            );
        }

        if (isAuthenticated) {
            return (
                <Wrapper auth={isAuthenticated}>
                    <Switch>
                        <Route path="/home" component={HomePage} />
                        <Route path="/event" component={EventDetails} />
                        <Route path="/profile-settings" component={ProfileSettings} />
                    </Switch>
                </Wrapper>
            );
        }

        return (
            <Wrapper auth={isAuthenticated}>
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/home" component={HomePage} />
                    <Route path="/event" component={EventDetails} />
                    <Route path="/login" component={Login} />
                    <Route path="/gate" component={Gate} />
                </Switch>
            </Wrapper>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        auth,
    };
};

const mapDispatchToProps = {
    getToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
