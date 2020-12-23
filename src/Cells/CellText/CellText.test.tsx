import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from 'test/test-utils';
import CellText from 'Cells/CellText/CellText';

describe('CellLabel test', () => {
  it('should not render an empty text', async () => {
    const { container } = render(
      <svg>
        <CellText row={1} column={1} />
      </svg>,
    );
    expect(await screen.queryByText('8')).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should render a letter', async () => {
    const { container } = render(
      <svg>
        <CellText row={1} column={1} text="a" />
      </svg>,
    );
    expect(await screen.queryByText(/a/i)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
