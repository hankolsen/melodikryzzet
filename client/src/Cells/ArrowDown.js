import React from 'react';
import PropTypes from 'prop-types';
import { CELL_WIDTH } from '../config';

const ArrowDown = (props) => {
  const { row, column } = props;
  const lineLength = 7;
  const strokeWidth = 1;

  const hx1 = ((column + 1) * (CELL_WIDTH + 1)) - 3;
  const hx2 = hx1 - lineLength;
  const hy1 = (row * (CELL_WIDTH + 1)) + 4;
  const hy2 = hy1;

  const vx1 = hx1;
  const vx2 = vx1;
  const vy1 = hy1;
  const vy2 = vy1 + lineLength;

  return (
    <g>
      <line x1={vx1} y1={vy1} x2={vx2} y2={vy2} strokeWidth={strokeWidth} stroke="black" />
      <line x1={hx1} y1={hy1} x2={hx2} y2={hy2} strokeWidth={strokeWidth} stroke="black" />
      <path d={`M${vx1 - 2},${vy2} L${vx1 + 2},${vy2} L${vx1},${vy2 + 5} z`} fill="#000" />
    </g>
  );
};

ArrowDown.propTypes = {
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
};

export default ArrowDown;
