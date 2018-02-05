import React from 'react';

const ArrowRight = (props) => {
  const { position, locations, cellWidth } = props;
  let [vx1, vx2, vy1, vy2, hx1, hx2, hy1, hy2] = [0, 0, cellWidth / 2, cellWidth / 2, 0, 0, cellWidth / 2, cellWidth / 2];
  let width = 7;
  let height = 1;

  vx1 = (position.x * (cellWidth + 1)) + 5;
  vx2 = vx1;
  vy1 = (position.y + locations[0]) * (cellWidth + 1) - 10;
  vy2 = vy1 + width;

  hx1 = vx1;
  hx2 = hx1 + width;
  hy1 = hy2 = vy2;

  return (
    <g>
      <line x1={vx1} y1={vy1} x2={vx2} y2={vy2} strokeWidth={height} stroke="black" />
      <line x1={hx1} y1={hy1} x2={hx2} y2={hy2} strokeWidth={height} stroke="black" />
      <path d={`M${hx2},${hy2-2} L${hx2},${hy2 + 2} L${hx2 + 5},${hy2} z`} fill="#000" />
    </g>
  )
}

export default ArrowRight;