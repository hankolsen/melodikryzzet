import React from 'react';

const Separator = (props) => {
  const { cellWidth, direction, position, separatorLocations } = props;
  let [x1, x2, y1, y2] = [0, 0, cellWidth / 2, cellWidth / 2];
  let width = 11;
  let height = 4;
  if (direction === 'across') {
    x1 = position.x + separatorLocations[','][0] * cellWidth;
    x2 = x1 + width;
    y2 = y1;
  } else {
    x1 = cellWidth / 2 + 1;
    x2 = x1;
    y1 = position.y - 1 + separatorLocations[','][0] *cellWidth;
    y2 = y1 + width;
  }
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={height} stroke="black" />
  )
}

export default Separator