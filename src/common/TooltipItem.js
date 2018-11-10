import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'reactstrap';

class TooltipItem extends React.Component {
    static propTypes = {
        speaker: PropTypes.shape({
            name: PropTypes.string,
        }).isRequired,
        id: PropTypes.string.isRequired,
        children: PropTypes.node.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            tooltipOpen: false,
        };
    }

  toggle = () => {
      this.setState({
          tooltipOpen: !this.state.tooltipOpen,
      });
  }

  render() {
      return (
          <span>
              <span id={`Tooltip-${this.props.id}`}>
                  {this.props.children}
              </span>

              <Tooltip
                  target={`Tooltip-${this.props.id}`}
                  placement="top"
                  isOpen={this.state.tooltipOpen}
                  toggle={this.toggle}
              >
                  {this.props.speaker.name}
              </Tooltip>
          </span>
      );
  }
}

export default TooltipItem;
