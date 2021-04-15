import React from 'react';
import { render } from 'test/test-utils';
import LoadingIndicator from './LoadingIndicator';

describe('LoadingIndicator test', () => {
  it('should render a LoadingIndicator', () => {
    const { container } = render(<LoadingIndicator />);
    expect(container).toMatchSnapshot();
  });
});
