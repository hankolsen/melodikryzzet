import React from 'react';
import { useCrossword } from 'Crossword/CrosswordContext';
import Cell from './Cell';

const Cells = ({ cells }) => {
  const { clickHandler } = useCrossword();

  return cells.map((row, y) =>
    row.map(
      (cell, x) =>
        cell && (
          <Cell
            key={`${y + 1}-${x + 1}`}
            row={y}
            column={x}
            number={cell.number}
            letter={cell.text}
            highlighted={cell.highlighted}
            selected={cell.selected}
            arrow={cell.arrow}
            clickHandler={clickHandler}
          />
        ),
    ),
  );
};

export default Cells;
