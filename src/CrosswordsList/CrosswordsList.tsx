import React from 'react';
import List from './List/List';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import { useCrosswordsList } from './CrosswordsListContext';

const CrosswordsList = () => {
  const { crosswords, isLoading, error } = useCrosswordsList();

  if (isLoading) {
    return (
      <div>
        <h1>Loading crosswords</h1>
        <LoadingIndicator />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Choose crossword</h1>
      <List crosswords={crosswords} />
    </div>
  );
};

export default CrosswordsList;
