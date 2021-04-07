/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { useParams } from 'react-router-dom';

import { CellType, Direction } from './Crossword.types';
import crosswordReducer from './crosswordReducer';
import createCrossword, { CrosswordType } from './utils/createCrossword';

type CrosswordContextType = {
  boardWidth: number,
  boardHeight: number,
  clickHandler: (row: number, column: number) => void;
  cells?: CellType[][];
  crosswordId: string;
  currentCell: CellType;
  inputWidth: number;
  inputHeight: number;
  isLoading: boolean;
  name?: string;
  numberOfColumns?: number;
  numberOfRows?: number;
  inputClickHandler: () => void;
  inputHandler: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  keyUpHandler: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  reset: () => void;
  separators?: unknown[];
  showInput: boolean;
};

const CrosswordContext = createContext<CrosswordContextType | undefined>(
  undefined,
);

const useCrossword = () => {
  const context = useContext(CrosswordContext);
  if (!context) {
    throw new Error('useCrossword must be used within a CrosswordContext');
  }
  return context;
};

const CrosswordProvider: FunctionComponent = ({ children }) => {
  const initialState = {
    isLoading: true,
    crossword: undefined,
    showInput: false,
    selection: '',
    currentCell: { row: 0, column: 0 } as CellType,
    direction: Direction.across,
  };
  const [
    { crossword, isLoading, currentCell, showInput },
    dispatch,
  ] = useReducer(crosswordReducer, initialState);
  const { crosswordId } = useParams<{ crosswordId: string }>();

  const clickHandler = (row: number, column: number) => {
    dispatch({ type: 'click_cell', row, column });
  };

  const inputHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    dispatch({ type: 'on_input', event });
  };
  const keyUpHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {};
  const inputClickHandler = () => {
    dispatch({ type: 'click_input' });
  };
  const reset = () => dispatch({ type: 'reset' });

  useEffect(() => {
    dispatch({ type: 'load' });
    createCrossword(crosswordId)
      .then((crossword) => dispatch({ type: 'crossword_loaded', crossword }))
      .catch((err) => dispatch({ type: 'crossword_load_failed', err }));
  }, [crosswordId]);

  const {
    cells,
    numberOfColumns,
    numberOfRows,
    boardWidth = 0,
    boardHeight = 0,
    inputWidth = 0,
    inputHeight = 0,
    name,
    separators,
  } = crossword || {};
  const value: CrosswordContextType = {
    boardWidth,
    boardHeight,
    clickHandler,
    cells,
    currentCell,
    crosswordId,
    inputWidth,
    inputHeight,
    isLoading,
    name,
    numberOfColumns,
    numberOfRows,
    inputClickHandler,
    inputHandler,
    keyUpHandler,
    separators,
    showInput,
    reset,
  };

  return (
    <CrosswordContext.Provider value={value}>
      {children}
    </CrosswordContext.Provider>
  );
};

export { CrosswordProvider, useCrossword };
