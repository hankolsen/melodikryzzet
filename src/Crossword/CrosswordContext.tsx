/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import createCrossword, { CrosswordType } from './createCrossword';

type CrosswordContextType = {
  clickHandler: (row: number, column: number) => void;
  crossword?: CrosswordType;
  currentCell: { row: number; column: number };
  isLoading: boolean;
  inputClickHandler: () => void;
  inputHandler: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  keyUpHandler: (event: React.KeyboardEvent<HTMLInputElement>) => void;
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
  const [crossword, setCrossword] = useState<CrosswordType>();
  const [isLoading, setIsLoading] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const [currentCell, setCurrentCell] = useState({ row: 0, column: 0 });
  const { id } = useParams<{ id: string }>();

  const clickHandler = (row: number, column: number) => {
    if (crossword) {
      setCurrentCell(crossword.cells[row][column]);
    }
    setShowInput(true);
  };

  const inputHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {};
  const keyUpHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {};
  const inputClickHandler = () => {};

  useEffect(() => {
    setIsLoading(true);
    createCrossword(id)
      .then((crossword) => setCrossword(crossword))
      .catch()
      .finally(() => setIsLoading(false));
  }, [id]);

  const value = {
    clickHandler,
    crossword,
    currentCell,
    isLoading,
    inputClickHandler,
    inputHandler,
    keyUpHandler,
    showInput,
  };

  return (
    <CrosswordContext.Provider value={value}>
      {children}
    </CrosswordContext.Provider>
  );
};

export { CrosswordProvider, useCrossword };
