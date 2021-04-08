import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { Direction } from 'Crossword/Crossword.types';
import { render, screen } from 'test/test-utils';
import Separator from './Separator';

describe('Separator test', () => {
  it('should not render anything for non-existion separator', () => {
    const { container } = render(
      <svg>
        <Separator
          direction={Direction.across}
          position={{ x: 0, y: 0 }}
          locations={[0]}
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
          position={{ x: 0, y: 0 }}
          locations={[0]}
          separator=","
        />
      </svg>,
    );
    expect(container.querySelector('line')).toBeInTheDocument();
    expect(screen).toMatchSnapshot();
  });
});
