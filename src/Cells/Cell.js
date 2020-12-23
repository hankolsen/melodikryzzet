import React from 'react';
import PropTypes from 'prop-types';

import CellRectangle from './CellRectangle';
import CellText from './CellText';
import ArrowAcross from './ArrowAcross';
import ArrowDown from './ArrowDown';
import CellLabel from './CellLabel/CellLabel';

const Cell = ({ row, number = '', column, letter = '', arrow = '', clickHandler, highlighted, selected }) => (
  <g onClick={(e) => clickHandler(e, row, column)}>
    <CellRectangle column={column} row={row} selected={selected} highlighted={highlighted} />
    { number ? <CellLabel column={column} row={row} number={number} /> : null }
    { arrow && arrow === 'across' ? <ArrowAcross column={column} row={row} /> : null }
    { arrow && arrow === 'down' ? <ArrowDown column={column} row={row} /> : null }
    <CellText row={row} column={column} text={letter} />
  </g>
);

Cell.defaultProps = {
  number: '',
  letter: '',
  arrow: '',
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
  arrow: PropTypes.string,
  clickHandler: PropTypes.func.isRequired,
  highlighted: PropTypes.bool,
  selected: PropTypes.bool,
};

export default Cell;
