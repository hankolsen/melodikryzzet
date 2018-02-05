import React from 'react';

const ArrowDown = (props) => {
  const { position, locations, cellWidth } = props;
  let [vx1, vx2, vy1, vy2, hx1, hx2, hy1, hy2] = [0, 0, cellWidth / 2, cellWidth / 2, 0, 0, cellWidth / 2, cellWidth / 2];
  let width = 7;
  let height = 1;

  hx1 = (position.x + locations[0]) * (cellWidth + 1) - 3;
  hx2 = hx1 - width;
  hy1 = hy2 = position.y * (cellWidth + 1) + 4;

  vx1 = hx1;
  vx2 = vx1;
  vy1 = hy1;
  vy2 = vy1 + width;


  return (
    <g>
      <line x1={vx1} y1={vy1} x2={vx2} y2={vy2} strokeWidth={height} stroke="black" />
      <line x1={hx1} y1={hy1} x2={hx2} y2={hy2} strokeWidth={height} stroke="black" />
      <path d={`M${vx1-2},${vy2} L${vx1+2},${vy2} L${vx1},${vy2 + 5} z`} fill="#000" />
    </g>
  )
}

export default ArrowDown;