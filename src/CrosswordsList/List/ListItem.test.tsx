import React from 'react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { screen, render } from 'test/test-utils';
import ListItem from './ListItem';

describe('ListItem test', () => {
  it('should render a list item', () => {
    const crossword = {
      id: 'abc-123',
      name: 'The Crossowrd to rule them all',
    };
    const { container } = render(
      <BrowserRouter>
        <ListItem crossword={crossword} />
      </BrowserRouter>,
    );
    expect(
      screen.queryByText(/the crossowrd to rule them all/i),
    ).toBeInTheDocument();
    expect(container.querySelector('a')?.getAttribute('href')).toBe(
      '/crossword/abc-123',
    );
    expect(container).toMatchSnapshot();
  });
});
