import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popover, PopoverBody } from 'reactstrap';

class PopoverItem extends Component {
    static propTypes = {
        item: PropTypes.shape({
            name: PropTypes.string,
            twitterId: PropTypes.string,
        }).isRequired,
        id: PropTypes.string.isRequired,
        shouldTogglePopover: PropTypes.bool,
        children: PropTypes.object,

        // received from parent component Attend
        onClick: PropTypes.func,
        isActive: PropTypes.bool,
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

    toggle() {
        /**
         * This PopoverItem has two different behaviours depending
         * on shouldTogglePopover prop
         */
        if (this.props.shouldTogglePopover) {
            this.setState({
                popoverOpen: !this.state.popoverOpen,
            });
        }

        /**
         * Call OnClick function from parent component Attend to change isActive icon,
         * and close Popover on Card Attend PopoverItem
         */
        if (!this.state.popoverOpen) {
            this.props.onClick();
        } else {
            this.setState({
                popoverOpen: false,
            });
        }

        /**
         * When clicking outside the isActive area, popover is closing,
         * otherwise it stays open
         */
        if (!this.props.isActive) {
            this.setState({
                popoverOpen: !this.state.popoverOpen,
            });
        }
    }

    render() {
        const style = { cursor: 'pointer' };
        return (
            <span>
                {this.props.item.twitterId ?
                    <a style={style} target="_blank" role="button" id={'Popover-' + this.props.id} onClick={this.toggle} href={`https://twitter.com/@${this.props.item.twitterName}`}>
                        {this.props.children}
                    </a> : <span style={style} role="button" id={'Popover-' + this.props.id} onClick={this.toggle}>
                        {this.props.children}
                    </span>
                }

                <Popover
                    className="mb-3"
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
