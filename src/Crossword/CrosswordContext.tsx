/* istanbul ignore file */
import React, {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { CellType, CrosswordContextType, Direction } from './Crossword.types';
import crosswordReducer from './crosswordReducer';
import createCrossword from './utils/createCrossword';
import useSingleCrossword from './useSingleCrossword';

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
    crossword: undefined,
    showInput: false,
    selection: '',
    currentCell: { row: 0, column: 0 } as CellType,
    direction: Direction.across,
    error: undefined,
  };
  const [{ crossword, currentCell, showInput }, dispatch] = useReducer(
    crosswordReducer,
    initialState,
  );
  const { crosswordId } = useParams<{ crosswordId: string }>();

  const clickHandler = (row: number, column: number) => {
    dispatch({ type: 'click_cell', row, column });
  };

  const inputHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    dispatch({ type: 'on_input', event });
  };

  const keyUpHandler = (event: React.KeyboardEvent<HTMLInputElement>) =>
    dispatch({ type: 'key_up', event });

  const inputClickHandler = () => dispatch({ type: 'click_input' });

  const reset = () => dispatch({ type: 'reset' });

  const { data, isLoading, error } = useSingleCrossword(crosswordId);

  useEffect(() => {
    if (data) {
      const crossword = createCrossword({
        crossword: data.crossword,
        crosswordId,
      });
      dispatch({ type: 'crossword_loaded', crossword });
    }
  }, [crosswordId, data]);

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
  } = crossword ?? {};

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
    error: error as AxiosError,
  };

  return (
    <CrosswordContext.Provider value={value}>
      {children}
    </CrosswordContext.Provider>
  );
};

export { CrosswordProvider, useCrossword, CrosswordContext };
