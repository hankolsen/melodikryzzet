import React from 'react';
import { CELL_HEIGHT, CELL_WIDTH } from '../config';

const CellText = ({ column, row, text}) => (
  <text
    x={CELL_WIDTH / 2 + column * (CELL_WIDTH + 1)}
    y={row * (CELL_HEIGHT + 1) + 25}
    className="crossword__cell-text"
    textAnchor="middle">{text}</text>
);

export default CellText;