import React from 'react';

import CellRectangle from './CellRectangle/CellRectangle';
import CellText from './CellText/CellText';
import ArrowAcross from './ArrowAcross';
import ArrowDown from './ArrowDown';
import CellLabel from './CellLabel/CellLabel';

type Props = {
  arrow?: string;
  clickHandler: (row: number, column: number) => void;
  column: number;
  highlighted?: boolean;
  letter?: string;
  number?: number;
  row: number;
  selected?: boolean;
};
const Cell = ({
  row,
  number,
  column,
  letter,
  arrow,
  clickHandler,
  highlighted,
  selected,
}: Props) => (
  <g onClick={() => clickHandler(row, column)} data-testid="cell">
    <CellRectangle
      column={column}
      row={row}
      selected={selected}
      highlighted={highlighted}
    />
    {number ? <CellLabel column={column} row={row} number={number} /> : null}
    {arrow && arrow === 'across' ? (
      <ArrowAcross column={column} row={row} />
    ) : null}
    {arrow && arrow === 'down' ? <ArrowDown column={column} row={row} /> : null}
    <CellText row={row} column={column} text={letter} />
  </g>
);

export default Cell;
