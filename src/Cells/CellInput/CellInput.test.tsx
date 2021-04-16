import React from 'react';
import { render, screen } from 'test/test-utils';
import { useCrossword } from 'Crossword/CrosswordContext';
import useInputPosition from 'Crossword/utils/useInputPosition';
import CellInput from './CellInput';

jest.mock('Crossword/CrosswordContext');
const mockUseCrossword = useCrossword as jest.Mock;

jest.mock('Crossword/utils/useInputPosition');
const mockUseInputPosition = useInputPosition as jest.Mock;

describe('CellInput test', () => {
  it('should not render if not show is true', () => {
    mockUseCrossword.mockImplementation(() => ({
      showInput: false,
    }));
    mockUseInputPosition.mockImplementation(() => ({}));

    const { container } = render(<CellInput />);
    expect(
      container.querySelector('.crossword__hidden-input-wrapper'),
    ).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should render an input', () => {
    mockUseCrossword.mockImplementation(() => ({
      showInput: true,
      inputHandler: () => {},
    }));

    mockUseInputPosition.mockImplementation(() => ({}));

    const { container } = render(<CellInput />);
    expect(
      container.querySelector('.crossword__hidden-input-wrapper'),
    ).toBeInTheDocument();
    expect(screen.queryByLabelText('letter')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
    expect(container.querySelector('.crossword__hidden-input-wrapper'));
  });
});
