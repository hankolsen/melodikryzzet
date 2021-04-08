import React from 'react';
import { render, screen } from 'test/test-utils';
import Crossword from './Crossword';
import { CrosswordContext } from './CrosswordContext';

describe('Crossword test', () => {
  it('should show a loading message and spinner when fetching the crossword', () => {
    render(
      <CrosswordContext.Provider value={{ isLoading: true } as any}>
        <Crossword />
      </CrosswordContext.Provider>,
    );
    screen.getByText(/loading crossword/i);
  });
});
