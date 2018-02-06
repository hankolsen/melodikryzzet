import React from 'react';
import Cell from './Cell';

const Cells = ({ cells, clickHandler }) => cells.map((row, y) =>
  row.map((cell, x) =>
    cell &&
        <Cell
          key={`${y + 1}-${x + 1}`}
          row={y}
          column={x}
          number={cell.number}
          letter={cell.text}
          highlighted={cell.highlighted}
          selected={cell.selected}
          clickHandler={clickHandler}
        />
  )
);

export default Cells;
