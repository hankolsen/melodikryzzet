import React from 'react';
import PropTypes from 'prop-types';

import { CELL_HEIGHT, CELL_WIDTH } from '../config';

const CellRectangle = ({ column, row, highlighted, selected }) => (
  <rect
    x={1 + (column * (CELL_WIDTH + 1))}
    y={1 + (row * (CELL_HEIGHT + 1))}
    width={CELL_WIDTH}
    height={CELL_HEIGHT}
    className={`crossword__cell ${highlighted ? 'crossword__cell--highlighted' : ''} ${selected ? 'crossword__cell--selected' : ''}`} // eslint-disable-line max-len
  />
);

CellRectangle.defaultProps = {
  highlighted: false,
  selected: false,
};

CellRectangle.propTypes = {
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
  highlighted: PropTypes.bool,
  selected: PropTypes.bool,
};

export default CellRectangle;
