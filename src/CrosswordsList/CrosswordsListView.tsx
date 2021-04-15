/* istanbul ignore file */
import React from 'react';
import { CrossWordsListProvider } from './CrosswordsListContext';
import CrosswordsList from './CrosswordsList';

const CrosswordsListView = () => (
  <CrossWordsListProvider>
    <CrosswordsList />
  </CrossWordsListProvider>
);

export default CrosswordsListView;
