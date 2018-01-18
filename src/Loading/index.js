import React, { Component } from 'react';
import { connect } from 'react-redux';

import { jwtTokenRequest } from '../Login/duck';

class Loading extends Component {
    componentDidMount() {
        this.props.jwtTokenRequest();
    }

    render() {
        return (
            <p>Loading.....</p>
        );
    }
}

const mapStateToProps = ({ token }) => {
    return {
        token,
    };
};

const mapDispatchToProps = {
    jwtTokenRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
