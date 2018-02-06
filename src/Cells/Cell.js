import React from 'react';
import CellRectangle from './CellRectangle'
import CellText from './CellText';
import CellLabel from './CellLabel';

const Cell = ({row, number, column, letter, clickHandler, highlighted, selected }) => (
  <g onClick={(e) => clickHandler(e, row, column)}>
    <CellRectangle column={column} row={row}  selected={selected} highlighted={highlighted}/>
    { number ? <CellLabel column={column} row={row} number={number}/> : null }
    <CellText row={row} column={column} text={letter}/>
  </g>
);

export default Cell;