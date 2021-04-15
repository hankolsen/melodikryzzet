import React from 'react';
import CrosswordView from './CrosswordView';
import { render } from '../test/test-utils';

describe('CrosswordView test', () => {
  it('should render the view', () => {
    const { container } = render(<CrosswordView />);

    expect(container).toMatchSnapshot();
  });
});
