import React, { Component } from 'react';
import { connect } from 'react-redux';

class WishList extends Component {
    render() {
        return (
            <div>

            </div>
        );
    }
}

const mapStateToProps = ({ wishList }) => {
    return {
        wishList,
    };
}

export default connect(mapStateToProps)(WishList);
