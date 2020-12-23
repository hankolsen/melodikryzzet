import React from 'react';
import CellInput from '../Cells/CellInput/CellInput';
import Cells from '../Cells/Cells';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import Separators from '../Separators/Separators';
import { useCrossword } from './CrosswordContext';
import { getInputPosition } from './crosswordHelper';

import './Crossword.css';

const Crossword = () => {
  const {
    crossword,
    currentCell,
    isLoading,
    showInput,
    inputClickHandler,
    inputHandler,
    keyUpHandler,
  } = useCrossword();
  const {
    cells,
    boardWidth,
    boardHeight,
    inputWidth = 0,
    inputHeight = 0,
    name,
    separators,
  } = crossword || {};

  const reset = () => {};

  const renderCrossword = () => {
    const { left, top } = getInputPosition(currentCell);
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
          {cells && <Cells cells={cells} />}
          <Separators separators={separators} />
        </svg>
        {showInput && (
          <CellInput
            top={top}
            left={left}
            width={inputWidth}
            height={inputHeight}
            inputHandler={inputHandler}
            keyUpHandler={keyUpHandler}
            clickHandler={inputClickHandler}
          />
        )}
      </div>
    );
  };

  return (
    <div className="crossword">
      <h3>{name || 'Loading crossword'}</h3>
      <div className="crossword-container">
        {isLoading ? <LoadingIndicator /> : renderCrossword()}
      </div>
      <button
        onClick={reset}
        type="submit"
        className={isLoading ? 'hidden' : ''}
      >
        Reset
      </button>
    </div>
  );
};

export default Crossword;
