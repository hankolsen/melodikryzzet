import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from 'test/test-utils';
import CellLabel from './CellLabel';

describe('CellLabel test', () => {
  it('should render correctly', async () => {
    const { container } = render(
      <svg>
        <CellLabel row={1} column={1} number={8} />
      </svg>,
    );
    expect(await screen.findByText('8')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
