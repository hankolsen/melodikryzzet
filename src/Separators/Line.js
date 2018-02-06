import React from 'react';
import { CELL_WIDTH } from '../config';

const Line = (props) => {
  const { position, locations, direction } = props;
  let [x1, x2, y1, y2] = [0, 0, CELL_WIDTH / 2, CELL_WIDTH / 2];
  let lineLength = 11;
  let strokeWidth = 4;
  if (direction === 'across') {
    x1 = position.x + locations[0] * CELL_WIDTH;
    x2 = x1 + lineLength;
    y2 = y1;
  } else {
    x1 = (position.x * (CELL_WIDTH + 1)) + CELL_WIDTH / 2 + 1;
    x2 = x1;
    y1 = position.y - 1 + locations[0] * CELL_WIDTH;
    y2 = y1 + lineLength;
  }
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={strokeWidth} stroke="black" />
  )
};

export default Line;