import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HeartFullIcon from '../../common/HeartFullIcon';
import HeartIcon from '../../common/HeartIcon';
import { attendConference } from './duck';
import PopoverItem from '../../common/PopoverItem';

class Attend extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        token: PropTypes.string.isRequired,
        attendConference: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
        };
    }


    handleToggleActive = () => {
        this.setState({
            isActive: !this.state.isActive,
        });
    }

    renderIcon = (isActive) => {
        if (isActive) {
            return (
                <HeartFullIcon />
            );
        }

        return (
            <HeartIcon />
        );
    }

    render() {
        if (this.state.isActive) {
            this.props.attendConference(this.props.id, this.props.token);
        }
        return (
            <PopoverItem
                id={this.props.id}
                item={{ name: 'Wanna go' }}
                onClick={this.handleToggleActive}
                isActive={this.state.isActive}
            >
                { this.renderIcon(this.state.isActive) }
            </PopoverItem>
        );
    }
}

const mapDispatchToProps = {
    attendConference,
};

export default connect(null, mapDispatchToProps)(Attend);
