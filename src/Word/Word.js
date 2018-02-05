import React from 'react';
import Cell from '../Cell/Cell.js';

const Word = (props) => {
  const {
    id,
    number,
    direction,
    length,
    group,
    position,
    separatorLocations
  } = props.entry;

  const renderCell = ({row, column, index, number}) => <Cell key={`${row + 1}-${column + 1}`} row={row} column={column} number={index === 0 ? number : ''} />;

  let cells;

  if (direction === 'across') {
    const row = position.y;
    cells = Array(length).fill().map((_, i) => position.x + i).map((column, index) =>
      renderCell({row, column, index, number})
    );
  } else {
    const column = position.x;
    cells = Array(length).fill().map((_, i) => position.y + i).map((row, index) =>
      renderCell({row, column, index, number})
    );
  }

  return cells;
};

export default Word;