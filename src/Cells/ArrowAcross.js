import React from 'react';
import PropTypes from 'prop-types';

import { CELL_WIDTH } from '../config';

const ArrowAcross = (props) => {
  const { row, column } = props;
  const lineLength = 7;
  const strokeWidth = 1;

  const vx1 = (column * (CELL_WIDTH + 1)) + 5;
  const vx2 = vx1;
  const vy1 = ((row + 1) * (CELL_WIDTH + 1)) - 10;
  const vy2 = vy1 + lineLength;

  const hx1 = vx1;
  const hx2 = hx1 + lineLength;
  const hy1 = vy2;
  const hy2 = hy1;

  return (
    <g>
      <line x1={vx1} y1={vy1} x2={vx2} y2={vy2} strokeWidth={strokeWidth} stroke="black" />
      <line x1={hx1} y1={hy1} x2={hx2} y2={hy2} strokeWidth={strokeWidth} stroke="black" />
      <path d={`M${hx2},${hy2 - 2} L${hx2},${hy2 + 2} L${hx2 + 5},${hy2} z`} fill="#000" />
    </g>
  );
};

ArrowAcross.propTypes = {
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
};

export default ArrowAcross;
