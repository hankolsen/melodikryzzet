import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { Direction } from 'Crossword/Crossword.types';
import { render } from 'test/test-utils';
import Separator from './Separator';

describe('Separator test', () => {
  it('should not render anything for non-existing separator', () => {
    const { container } = render(
      <svg>
        <Separator
          direction={Direction.across}
          position={{ x: 3, y: 4 }}
          locations={[2]}
          id="2"
          separator="."
        />
      </svg>,
    );
    expect(container.querySelector('line')).not.toBeInTheDocument();
  });

  it('should render a line', () => {
    const { container } = render(
      <svg>
        <Separator
          direction={Direction.across}
          position={{ x: 2, y: 3 }}
          locations={[2]}
          id="3"
          separator=","
        />
      </svg>,
    );
    expect(container.querySelector('line')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
