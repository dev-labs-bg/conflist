import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Speakers from './Events/Speakers';
import PageNotFound from './common/PageNotFound';
import Loading from './common/Loading';
import Wrapper from './common/Wrapper';
import EventDetails from './Events/Details';
import HomePage from './Home';
import Login from './Login';
import Gate from './Gate';
import ProfileSettings from './ProfileSettings';
import WishList from './Events/WishList';
import MySubscriptions from './MySubscriptions';
import SearchList from './Events/SearchList';
import SuggestConference from './SuggestConference';
import Feedback from './Feedback';
import { getToken } from './Login/duck';
import { fetchCurrentUser } from './ProfileSettings/duck';

class App extends Component {
    static propTypes = {
        auth: PropTypes.shape({
            error: PropTypes.number,
            isAuthenticated: PropTypes.bool,
            token: PropTypes.string,
            isLoading: PropTypes.bool,
        }).isRequired,
        getToken: PropTypes.func.isRequired,
        fetchCurrentUser: PropTypes.func.isRequired,
    };

    async componentDidMount() {
        await this.props.getToken();
        if (this.props.auth.isAuthenticated) {
            this.props.fetchCurrentUser(this.props.auth.token);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.fetchCurrentUser(nextProps.auth.token);
        }
    }

    render() {
        const { isAuthenticated, isLoading, error } = this.props.auth;

        if (isLoading || isLoading === null) {
            return <Loading />;
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
                <Wrapper>
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/home" component={HomePage} />
                        <Route path="/event" component={EventDetails} />
                        <Route path="/speaker" component={Speakers} />
                        <Route path="/profile-settings" component={ProfileSettings} />
                        <Route path="/wanna-go-list" component={WishList} />
                        <Route path="/search" component={SearchList} />
                        <Route path="/my-subscriptions" component={MySubscriptions} />
                        <Route path="/conference-suggest" component={SuggestConference} />
                        <Route path="/feedback" component={Feedback} />
                        <Route path="*" component={PageNotFound} />
                    </Switch>
                </Wrapper>
            );
        }

        return (
            <Wrapper>
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/home" component={HomePage} />
                    <Route path="/event" component={EventDetails} />
                    <Route path="/speaker" component={Speakers} />
                    <Route path="/login" component={Login} />
                    <Route path="/gate" component={Gate} />
                    <Route path="/search" component={SearchList} />
                    <Route path="/conference-suggest" component={SuggestConference} />
                    <Route path="/feedback" component={Feedback} />
                    <Route path="*" component={PageNotFound} />
                </Switch>
            </Wrapper>
        );
    }
}

const mapStateToProps = ({ auth }) => ({
    auth,
});

const mapDispatchToProps = {
    getToken,
    fetchCurrentUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
