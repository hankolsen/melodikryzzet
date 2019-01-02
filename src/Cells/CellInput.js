import React from 'react';
import PropTypes from 'prop-types';

class CellInput extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = { value: '' };
  }

  onChange() {
    this.setState({ value: '' });
  }

  focus() {
    this.cellInput.focus();
  }

  render() {
    const { clickHandler, keyDownHandler, keyUpHandler, width, height, top, left } = this.props;
    return (
      <div className="crossword__hidden-input-wrapper" style={{ width: `${width}%`, height: `${height}%`, top: `${top}%`, left: `${left}%` }}>
        <input
          type="text"
          aria-label="letter"
          maxLength="1"
          value={this.state.value}
          onChange={this.onChange}
          autoComplete="off"
          spellCheck="false"
          autoCorrect="off"
          className="crossword__hidden-input"
          onKeyDown={keyDownHandler}
          onKeyUp={keyUpHandler}
          onClick={clickHandler}
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
