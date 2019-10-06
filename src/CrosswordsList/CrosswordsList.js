import React from 'react';
import List from './List/List';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import { useCrosswordsList } from './CrosswordsListContext';

const CrosswordsList = () => {

  const { crosswords } = useCrosswordsList();

  if (crosswords && crosswords.length) {
    return (
      <div>
        <h1>Choose crossword</h1>
        <List crosswords={crosswords} />
      </div>
    );
  }

  return (
    <div>
      <h1>Loading crosswords</h1>
      <LoadingIndicator />
    </div>
  );
};

export default CrosswordsList;
