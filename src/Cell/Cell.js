import React from 'react';

const Cell = ({row, number, column, letter, clickHandler, highlighted, selected, width, height}) => (
  <g onClick={(e) => clickHandler(e, row, column)}>
    <rect x={1 + column*(width + 1)} y={1 + row*(height + 1)} width={width} height={height} className={`crossword__cell ${highlighted ? 'crossword__cell--highlighted': ''} ${selected ? 'crossword__cell--selected': ''}`}></rect>
    <text x={2 + column*(width + 1)} y={10 + row*(height + 1)} className="crossword__cell-number">{number}</text>
    <text x={width / 2 + column * (width + 1)} y={row * (height + 1) + 25} className="crossword__cell-text" textAnchor="middle">{letter}</text>
  </g>
);

export default Cell;