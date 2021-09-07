import React from 'react';

import { CELL_WIDTH } from '../config';
import { Direction, Position } from '../Crossword/Crossword.types';

type Props = {
  position: Position;
  location: number;
  direction: Direction;
};

const Line = ({ position, location, direction }: Props) => {
  let [x1, x2, y1, y2] = [0, 0, CELL_WIDTH / 2, CELL_WIDTH / 2];
  const lineLength = 11;
  const strokeWidth = 4;
  if (direction === 'across') {
    x1 = (position.x + location) * (CELL_WIDTH + 1) - lineLength / 2;
    x2 = x1 + lineLength;
    y1 += position.y * (CELL_WIDTH + 1);
    y2 = y1;
  } else {
    x1 = position.x * (CELL_WIDTH + 1) + CELL_WIDTH / 2 + 1;
    x2 = x1;
    y1 = (position.y + location) * (CELL_WIDTH + 1) - lineLength / 2 + 1;
    y2 = y1 + lineLength;
  }
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      strokeWidth={strokeWidth}
      stroke="black"
    />
  );
};

export default Line;
