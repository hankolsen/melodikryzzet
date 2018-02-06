import React from 'react';
import { CELL_HEIGHT, CELL_WIDTH } from '../config';

const CellLabel = ({ row, column, number }) => (
  <text
    x={2 + column * (CELL_WIDTH + 1)}
    y={10 + row * (CELL_HEIGHT + 1)}
    className="crossword__cell-number">{number}</text>
);

export default CellLabel;