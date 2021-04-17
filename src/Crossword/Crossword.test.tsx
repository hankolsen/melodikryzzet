import React from 'react';
import { render, screen } from 'test/test-utils';
import Crossword from './Crossword';
import { CellType, CrosswordContextType } from './Crossword.types';
import { CrosswordContext } from './CrosswordContext';

describe('Crossword test', () => {
  it('should show a loading message and spinner when fetching the crossword', () => {
    const { container } = render(
      <CrosswordContext.Provider value={{ isLoading: true } as any}>
        <Crossword />
      </CrosswordContext.Provider>,
    );
    screen.getByText(/loading crossword/i);
    expect(container).toMatchSnapshot();
  });

  it('should show an error message if fetching fails', () => {
    const { container } = render(
      <CrosswordContext.Provider
        value={
          { isError: true, error: { message: 'An error occurred' } } as any
        }
      >
        <Crossword />
      </CrosswordContext.Provider>,
    );
    expect(screen.getByText(/an error occurred/i)).toBeInTheDocument();
    expect(screen.queryByText(/tema covers/i)).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should show a crossword when fetching is done', () => {
    const value: CrosswordContextType = {
      cells: [[]],
      boardHeight: 100,
      boardWidth: 100,
      clickHandler: () => {},
      crosswordId: 'abc-123',
      currentCell: {} as CellType,
      inputClickHandler: () => {},
      inputWidth: 10,
      inputHeight: 10,
      inputHandler: () => {},
      isLoading: false,
      reset: () => {},
      showInput: false,
      keyUpHandler: () => {},
      name: 'Tema Covers',
    };

    const { container } = render(
      <CrosswordContext.Provider value={value}>
        <Crossword />
      </CrosswordContext.Provider>,
    );
    screen.getByText(/tema covers/i);
    expect(container).toMatchSnapshot();
  });
});
