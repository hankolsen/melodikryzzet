/* istanbul ignore file */
import React, { createContext, FunctionComponent, useContext } from 'react';
import { CrosswordListItem } from 'Crossword/Crossword.types';
import useCrosswordListData from 'CrosswordsList/useCrosswordListData';
import { AxiosError } from 'axios';

const initialValue = {
  isLoading: false,
  error: undefined,
  crosswords: [],
};
type CrosswordsListContextType = {
  isLoading: boolean;
  error?: AxiosError;
  crosswords?: CrosswordListItem[];
};
const CrosswordsListContext = createContext<CrosswordsListContextType>(
  initialValue,
);

const useCrosswordsList = () => {
  const context = useContext(CrosswordsListContext);
  if (!context) {
    throw new Error(
      'useCrosswordsList must be used within a CrosswordsListContext',
    );
  }
  return context;
};

const CrossWordsListProvider: FunctionComponent = ({ children }) => {
  const value = useCrosswordListData();

  return (
    <CrosswordsListContext.Provider value={value}>
      {children}
    </CrosswordsListContext.Provider>
  );
};

export { CrossWordsListProvider, useCrosswordsList };
