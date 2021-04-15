import React from 'react';
import { renderWithSvg } from 'test/test-utils';
import CellRectangle from 'Cells/CellRectangle/CellRectangle';

describe('CellLabel test', () => {
  it('should empty rectangle', async () => {
    const { container } = renderWithSvg(<CellRectangle row={1} column={1} />);
    expect(container.getElementsByTagName('rect')[0]).toHaveClass(
      'crossword__cell',
    );
    expect(container.getElementsByTagName('rect')[0]).not.toHaveClass(
      'crossword__cell--highlighted',
    );
    expect(container.getElementsByTagName('rect')[0]).not.toHaveClass(
      'crossword__cell--selected',
    );
    expect(container).toMatchSnapshot();
  });

  it('should render selected rectangle', async () => {
    const { container } = renderWithSvg(
      <CellRectangle row={1} column={1} selected />,
    );
    expect(container.getElementsByTagName('rect')[0]).toHaveClass(
      'crossword__cell',
    );
    expect(container.getElementsByTagName('rect')[0]).not.toHaveClass(
      'crossword__cell--highlighted',
    );
    expect(container.getElementsByTagName('rect')[0]).toHaveClass(
      'crossword__cell--selected',
    );
    expect(container).toMatchSnapshot();
  });

  it('should render highlighted rectangle', async () => {
    const { container } = renderWithSvg(
      <CellRectangle row={1} column={1} highlighted />,
    );
    expect(container.getElementsByTagName('rect')[0]).toHaveClass(
      'crossword__cell',
    );
    expect(container.getElementsByTagName('rect')[0]).toHaveClass(
      'crossword__cell--highlighted',
    );
    expect(container.getElementsByTagName('rect')[0]).not.toHaveClass(
      'crossword__cell--selected',
    );
    expect(container).toMatchSnapshot();
  });

  it('should render highlighted and selected rectangle', async () => {
    const { container } = renderWithSvg(
      <CellRectangle row={1} column={1} highlighted selected />,
    );
    expect(container.getElementsByTagName('rect')[0]).toHaveClass(
      'crossword__cell',
    );
    expect(container.getElementsByTagName('rect')[0]).toHaveClass(
      'crossword__cell--highlighted',
    );
    expect(container.getElementsByTagName('rect')[0]).toHaveClass(
      'crossword__cell--selected',
    );
    expect(container).toMatchSnapshot();
  });
});
