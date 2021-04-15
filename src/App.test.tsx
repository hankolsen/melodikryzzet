import React from 'react';
import { render } from './test/test-utils';
import App from './App';

describe('App test', () => {
  it('should render the App', () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
    const homeLink = container.querySelector('a.header__home-link');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink?.textContent).toEqual('Melodikryzzet');
  });
});
