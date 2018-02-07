import React from 'react';
import PropTypes from 'prop-types';

import CellRectangle from './CellRectangle';
import CellText from './CellText';
import CellLabel from './CellLabel';

const Cell = ({ row, number = '', column, letter = '', clickHandler, highlighted, selected }) => (
  <g onClick={e => clickHandler(e, row, column)}>
    <CellRectangle column={column} row={row} selected={selected} highlighted={highlighted} />
    { number ? <CellLabel column={column} row={row} number={number} /> : null }
    <CellText row={row} column={column} text={letter} />
  </g>
);

Cell.defaultProps = {
  number: '',
  letter: '',
};

Cell.defaultProps = {
  highlighted: false,
  selected: false,
};

Cell.propTypes = {
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
  number: PropTypes.number,
  letter: PropTypes.string,
  clickHandler: PropTypes.func.isRequired,
  highlighted: PropTypes.bool,
  selected: PropTypes.bool,
};

export default Cell;
