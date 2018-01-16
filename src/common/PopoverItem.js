import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popover, PopoverHeader } from 'reactstrap';

class PopoverItem extends Component {
    static propTypes = {
        item: PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            pictureUrl: PropTypes.string,
        }).isRequired,
        id: PropTypes.number.isRequired,
    }

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            popoverOpen: false,
        };
    }

    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen,
        });
    }

    render() {
      console.log(this.props);
        return (
            <span>
                <span role="button" id={'Popover-' + this.props.id} onClick={this.toggle}>
                    {this.props.children}
                </span>
                <Popover
                    placement="top"
                    isOpen={this.state.popoverOpen}
                    target={'Popover-' + this.props.id}
                    toggle={this.toggle}
                >
                    <PopoverHeader>{this.props.item.name}</PopoverHeader>
                </Popover>
            </span>
        );
    }
}

export default PopoverItem;
