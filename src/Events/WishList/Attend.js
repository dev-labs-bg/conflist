import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Transition from 'react-transition-group/Transition';

import HeartFullIcon from '../../common/HeartFullIcon';
import HeartIcon from '../../common/HeartIcon';
import PastEventIcon from '../../common/PastEventIcon';
import { attendConference, unattendConference } from './duck';
import PopoverItem from '../../common/PopoverItem';

class Attend extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        token: PropTypes.string,
        attendConference: PropTypes.func.isRequired,
        unattendConference: PropTypes.func.isRequired,
        past: PropTypes.bool,
        wishListed: PropTypes.bool,
        onClick: PropTypes.func,
        isActive: PropTypes.bool,
    };

    static defaultProps = {
        past: false,
        wishListed: false,
        token: '',
        onClick: () => {},
        isActive: false,
    };

    handleToggleActive = () => {
        /**
         * Call OnClick function from parent component Card to change isActive prop
         */
        this.props.onClick();

        if (this.props.token === null) {
            return null;
        }

        if (!this.props.isActive) {
            this.props.attendConference(this.props.id, this.props.token);
        } else {
            this.props.unattendConference(this.props.id, this.props.token);
        }
    }

    /**
     * Change Icon on isActive prop change
     * @param  {Boolean}
     * @return {svg icon}
     */
    renderIcon = (isActive) => {
        if (isActive && this.props.token !== null) {
            return <HeartFullIcon />;
        }

        return <HeartIcon />;
    }

    render() {
        if (this.props.past) {
            return <PastEventIcon />;
        }

        return (
            <PopoverItem
                id={this.props.id}
                item={{ name: 'Wanna go' }}
                onClick={this.handleToggleActive}
                isActive={this.props.isActive}
            >
                <Transition
                    timeout={500}
                >
                    { this.renderIcon(this.props.isActive) }
                </Transition>
            </PopoverItem>
        );
    }
}

const mapDispatchToProps = {
    attendConference,
    unattendConference,
};

export default connect(null, mapDispatchToProps)(Attend);
