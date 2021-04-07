import React from 'react';
import CellInput from 'Cells/CellInput/CellInput';
import Cells from 'Cells/Cells';
import Separators from 'Separators/Separators';
import { useCrossword } from './CrosswordContext';

const CrosswordBoard = () => {
  const { boardWidth, boardHeight, separators } = useCrossword();
  return (
    <div className="crossword-board">
      <svg
        className="crossword__grid"
        viewBox={`0 0 ${boardWidth} ${boardHeight}`}
        fill="#222222"
      >
        <rect
          x="0"
          y="0"
          width={boardWidth}
          height={boardHeight}
          className="crossword__grid-background"
        />
        <Cells />
        <Separators separators={separators} />
      </svg>
      <CellInput />
    </div>
  );
};

export default CrosswordBoard;
