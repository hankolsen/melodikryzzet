import React from 'react';
import { render, screen } from 'test/test-utils';
import CrosswordsList from 'CrosswordsList/CrosswordsList';
import { useCrosswordsList } from 'CrosswordsList/CrosswordsListContext';
import { BrowserRouter } from 'react-router-dom';

jest.mock('./CrosswordsListContext');
const mockGetData = useCrosswordsList as jest.Mock;

describe('CrosswordList test', () => {
  it('should show a loading message', () => {
    mockGetData.mockImplementation(() => ({ isLoading: true }));
    render(<CrosswordsList />);
    expect(screen.queryByText(/loading/i)).toBeInTheDocument();
  });

  it('should show an error message', () => {
    mockGetData.mockImplementation(() => ({
      isLoading: false,
      error: { message: 'Request failed with status code 500' },
    }));
    render(<CrosswordsList />);
    expect(
      screen.queryByText(/request failed with status code 500/i),
    ).toBeInTheDocument();
  });

  it('should show an list of crosswords', () => {
    mockGetData.mockImplementation(() => ({
      isLoading: false,
      error: false,
      crosswords: [
        { id: 'abc-123', name: 'Nummer 1' },
        { id: 'def-345', name: 'Nummer 2' },
      ],
    }));
    const { container } = render(
      <BrowserRouter>
        <CrosswordsList />
      </BrowserRouter>,
    );
    expect(screen.queryByText(/choose crossword/i)).toBeInTheDocument();
    expect(screen.queryByText(/nummer 1/i)).toBeInTheDocument();
    expect(screen.queryByText(/nummer 2/i)).toBeInTheDocument();
    expect(container.querySelectorAll('a').length).toBe(2);
    expect(container.querySelectorAll('a').item(1).href).toBe(
      'http://localhost/crossword/def-345',
    );
  });
});
