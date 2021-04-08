import React from 'react';

import { CELL_HEIGHT, CELL_WIDTH } from 'config';

type Props = {
  column: number;
  row: number;
  highlighted?: boolean;
  selected?: boolean;
};

const CellRectangle = ({ column, row, highlighted = false, selected = false }: Props) => (
  <rect
    x={1 + (column * (CELL_WIDTH + 1))}
    y={1 + (row * (CELL_HEIGHT + 1))}
    width={CELL_WIDTH}
    height={CELL_HEIGHT}
    className={`crossword__cell ${highlighted ? 'crossword__cell--highlighted' : ''} ${selected ? 'crossword__cell--selected' : ''}`} // eslint-disable-line max-len
  />
);

export default CellRectangle;
