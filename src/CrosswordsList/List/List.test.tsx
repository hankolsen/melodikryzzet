import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'test/test-utils';
import List from './List';

describe('List test', () => {
  it('should render a list item', () => {
    const crosswords = [
      {
        id: 'abc-123',
        name: 'The Crossowrd to rule them all',
      },
      {
        id: 'cde-456',
        name: 'The worst crossowrd',
      },
    ];
    const { container } = render(
      <BrowserRouter>
        <List crosswords={crosswords} />
      </BrowserRouter>,
    );
    expect(container.querySelectorAll('a').length).toBe(2);
    expect(container.querySelectorAll('a').item(1).href).toBe(
      'http://localhost/crossword/cde-456',
    );
    expect(container).toMatchSnapshot();
  });
});
