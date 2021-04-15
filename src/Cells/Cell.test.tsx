import React from 'react';
import userEvent from '@testing-library/user-event';

import { renderWithSvg, screen } from '../test/test-utils';
import Cell from './Cell';

describe('Cell test', () => {
  it('should render an empty Cell', () => {
    const { container } = renderWithSvg(
      <Cell column={0} row={0} clickHandler={() => {}} />,
    );
    expect(
      container.querySelector('.crossword__cell-number'),
    ).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should render a Cell with a letter, a number, and an across arrow', () => {
    const { container } = renderWithSvg(
      <Cell
        column={0}
        row={0}
        clickHandler={() => {}}
        letter="l"
        number={3}
        arrow="across"
      />,
    );
    expect(screen.queryByText(/^l$/i)).toBeInTheDocument();
    expect(screen.queryByText(/^q$/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^3$/i)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should render a Cell with a down arrow', () => {
    const { container } = renderWithSvg(
      <Cell column={0} row={0} clickHandler={() => {}} arrow="down" />,
    );
    expect(screen.queryByText(/^q$/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^3$/i)).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should trigger click the click handler', () => {
    const mockClickHandler = jest.fn();
    const row = 1;
    const column = 2;

    renderWithSvg(
      <Cell
        column={column}
        row={row}
        clickHandler={mockClickHandler}
        arrow="down"
      />,
    );

    userEvent.click(screen.getByTestId('cell'));
    expect(mockClickHandler).toHaveBeenCalledTimes(1);
    expect(mockClickHandler).toHaveBeenCalledWith(row, column);
  });
});
