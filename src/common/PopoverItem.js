import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popover, PopoverBody } from 'reactstrap';

class PopoverItem extends Component {
    static propTypes = {
        item: PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            pictureUrl: PropTypes.string,
        }).isRequired,
        id: PropTypes.string.isRequired,
        onClick: PropTypes.func,
        isActive: PropTypes.bool,
        children: PropTypes.object,
    };

    static defaultProps = {
        onClick: () => {},
        isActive: true,
    };

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            popoverOpen: false,
        };
    }

    /**
     * Popover toggle
     *
     * @param  {popOverOpen}
     * @param  isActive {bool} - from parent component Attend received as props
     * @param  onClick {func} - from parent component received as props
     */
    toggle() {
        /**
         * Call OnClick function from parent component Attend to change heart icon,
         * and close Popover
         */
        if (!this.state.popoverOpen) {
            this.props.onClick();
        } else {
            this.setState({
                popoverOpen: false,
            });
        }

        /**
         * toggle PopOver based on Attend component state - isActive
         */
        if (!this.props.isActive) {
            this.setState({
                popoverOpen: !this.state.popoverOpen,
            });
        }
    }

    render() {
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
                    <PopoverBody>{this.props.item.name}</PopoverBody>
                </Popover>
            </span>
        );
    }
}

export default PopoverItem;
