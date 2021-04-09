import React from 'react';
import { render, screen } from 'test/test-utils';
import CellLabel from './CellLabel';

describe('CellLabel test', () => {
  it('should render correctly', () => {
    const { container } = render(
      <svg>
        <CellLabel row={1} column={1} number={8} />
      </svg>,
    );
    expect(screen.queryByText('8')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
