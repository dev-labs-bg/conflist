import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
    render() {
        if (!this.props.show) {
          return null;
        }

        // The modal "window"
        const modalStyle = {
            position: 'fixed',
            zIndex: 500,
            width: '40%',
            border: '1px solid #ccc',
            boxShadow: '1px 1px 1px grey',
            padding: '16px',
            left: '30%',
            top: '30%',
            boxSizing: 'border-box',
            transition: 'all 0.3s ease-out',
        };
        return (
          <div className="alert alert-light text-center" role="alert" style={modalStyle}>
              {this.props.text}

              <div>
                <button className="btn btn-primary mt-1" onClick={this.props.onClose}>
                  Close
                </button>
              </div>
        </div>
        );
    }
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
};

export default Modal;
