import React from 'react';
import PropTypes from 'prop-types';

//https://daveceddia.com/open-modal-in-react/

class Modal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    return (
      <div className="backdrop">
        <div className="modal">
          {this.props.children}

          <div className="footer">
            <button onClick={this.props.onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}



export default Modal;