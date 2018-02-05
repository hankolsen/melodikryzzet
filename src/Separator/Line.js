import React from 'react';

const Line = (props) => {
  const { position, locations, cellWidth, direction } = props;
  let [x1, x2, y1, y2] = [0, 0, cellWidth / 2, cellWidth / 2];
  let width = 11;
  let height = 4;
  if (direction === 'across') {
    x1 = position.x + locations[0] * cellWidth;
    x2 = x1 + width;
    y2 = y1;
  } else {
    x1 = (position.x * (cellWidth + 1)) + cellWidth / 2 + 1;
    x2 = x1;
    y1 = position.y - 1 + locations[0] * cellWidth;
    y2 = y1 + width;
  }
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={height} stroke="black" />
  )
}

export default Line;