import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { jwtTokenRequest } from '../Login/duck';

class Loading extends Component {
    static propTypes = {
        jwtTokenRequest: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.jwtTokenRequest();
        this.props.history.push('/home');
    }

    render() {
        return (
            <p>Loading.....</p>
        );
    }
}

const mapDispatchToProps = {
    jwtTokenRequest,
};

export default connect(null, mapDispatchToProps)(Loading);
