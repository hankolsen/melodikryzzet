import React from 'react';
import Crossword from './Crossword';
import { CrosswordProvider } from './CrosswordContext';

const CrosswordView = () => (
  <CrosswordProvider>
    <Crossword />
  </CrosswordProvider>
);

export default CrosswordView;
