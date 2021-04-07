import React from 'react';
import CellInput from '../Cells/CellInput/CellInput';
import Cells from '../Cells/Cells';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import Separators from '../Separators/Separators';
import { useCrossword } from './CrosswordContext';

import './Crossword.css';

const Crossword = () => {
  const {
    boardWidth,
    boardHeight,
    cells,
    isLoading,
    name,
    separators,
    showInput,
    inputClickHandler,
    inputHandler,
    keyUpHandler,
  } = useCrossword();

  const reset = () => {};

  const renderCrossword = () => (
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
          inputHandler={inputHandler}
          keyUpHandler={keyUpHandler}
          clickHandler={inputClickHandler}
        />
      )}
    </div>
  );

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
