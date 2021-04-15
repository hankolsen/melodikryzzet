import React from 'react';
import { useCrossword } from '../Crossword/CrosswordContext';
import Cells from './Cells';
import { renderWithSvg, screen } from '../test/test-utils';

jest.mock('../Crossword/CrosswordContext');
const mockUseCrossword = useCrossword as jest.Mock;

describe('Cells test', () => {
  it('should not render if there are no cells', () => {
    mockUseCrossword.mockImplementation(() => ({ cells: undefined }));
    const { container } = renderWithSvg(<Cells />);
    expect(screen.queryByTestId('cell')).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should not render cells', () => {
    mockUseCrossword.mockImplementation(() => ({
      cells: [[{ number: 2, x: 0, y: 1 }], [{ text: 'q', x: 2, y: 4 }]],
    }));
    const { container } = renderWithSvg(<Cells />);
    expect(screen.queryAllByTestId('cell')).toHaveLength(2);
    expect(screen.queryByText(/^2$/)).toBeInTheDocument();
    expect(screen.queryByText(/^q$/i)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
