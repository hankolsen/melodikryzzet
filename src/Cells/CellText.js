import React from 'react';
import PropTypes from 'prop-types';

import { CELL_HEIGHT, CELL_WIDTH } from '../config';

const CellText = ({ column, row, text }) => (
  <text
    x={(CELL_WIDTH / 2) + (column * (CELL_WIDTH + 1))}
    y={(row * (CELL_HEIGHT + 1)) + 25} // Magic number to align the text vertically...
    className="crossword__cell-text"
    textAnchor="middle"
  >{text}
  </text>
);

CellText.defaultProps = {
  text: '',
};

CellText.propTypes = {
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
  text: PropTypes.string,
};

export default CellText;
