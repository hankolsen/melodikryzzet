import React from 'react';

import { CELL_HEIGHT, CELL_WIDTH } from 'config';

type Props = {
  column: number;
  row: number;
  text?: string;
};

const CellText = ({ column, row, text = '' }: Props) => (
  <text
    x={(CELL_WIDTH / 2) + (column * (CELL_WIDTH + 1))}
    y={(row * (CELL_HEIGHT + 1)) + 25} // Magic number to align the text vertically...
    className="crossword__cell-text"
    textAnchor="middle"
  >{text}
  </text>
);

export default CellText;
