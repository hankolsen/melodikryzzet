import React from 'react';
import { renderWithSvg, screen } from 'test/test-utils';
import CellLabel from './CellLabel';

describe('CellLabel test', () => {
  it('should render correctly', () => {
    const { container } = renderWithSvg(
      <CellLabel row={1} column={1} number={8} />,
    );
    expect(screen.queryByText('8')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
