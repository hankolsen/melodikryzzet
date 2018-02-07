import React from 'react';
import PropTypes from 'prop-types';

class CellInput extends React.Component {

  componentDidMount() {
    const { clickHandler } = this.props;
    ['click', 'touchstart'].forEach((eventListener) => {
      this.cellInput.addEventListener(eventListener, clickHandler);
    });
  }

  focus() {
    this.cellInput.focus();
  }

  render() {
    const { keyDownHandler, keyUpHandler, width, height, top, left } = this.props;

    return (
      <div className="crossword__hidden-input-wrapper" style={{ width, height, top: `${top}%`, left: `${left}%` }}>
        <input
          type="text"
          maxLength="1"
          value=""
          autoComplete="off"
          spellCheck="false"
          autoCorrect="off"
          className="crossword__hidden-input"
          onKeyDown={keyDownHandler}
          onKeyUp={keyUpHandler}
          ref={(input) => { this.cellInput = input; }}
        />
      </div>
    );
  }
}

CellInput.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  keyDownHandler: PropTypes.func.isRequired,
  keyUpHandler: PropTypes.func.isRequired,
  left: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
};

export default CellInput;
