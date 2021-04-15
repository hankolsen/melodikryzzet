import React from 'react';
import ResetButton from './ResetButton';
import { render, screen } from '../test/test-utils';
import { useCrossword } from './CrosswordContext';

jest.mock('./CrosswordContext');
const mockUseCrossword = useCrossword as jest.Mock;

describe('ResetButton test', () => {
  it('should hide button while loading', () => {
    mockUseCrossword.mockImplementation(() => ({ isLoading: true }));
    const { container } = render(<ResetButton />);
    expect(container).toMatchSnapshot();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should render a button', () => {
    mockUseCrossword.mockImplementation(() => ({ isLoading: false }));
    const { container } = render(<ResetButton />);
    expect(container).toMatchSnapshot();
    expect(screen.queryByRole('button')).toBeInTheDocument();
    expect(screen.queryByText(/reset/i)).toBeInTheDocument();
  });
});
