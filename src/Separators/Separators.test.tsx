import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Direction, SeparatorType } from 'Crossword/Crossword.types';
import Separators from './Separators';

describe('Separators test', () => {
  it('should not render anything', () => {
    const { container } = render(
      <svg>
        <Separators />
      </svg>,
    );

    expect(container.childNodes.length).toBe(1);
  });

  it('should still not render anything', () => {
    const separators: SeparatorType[] = [];

    const { container } = render(
      <svg>
        <Separators separators={separators} />
      </svg>,
    );

    expect(container.childNodes.length).toBe(1);
  });

  it('should a single separator', () => {
    const separators: SeparatorType[] = [
      {
        direction: Direction.across,
        separator: ',',
        position: { x: 0, y: 0 },
        locations: [0],
        id: '1',
      },
    ];

    const { container } = render(
      <svg>
        <Separators separators={separators} />
      </svg>,
    );

    expect(container.querySelector('line')).toBeInTheDocument();
  });

  it('should a multiple separators', () => {
    const separators: SeparatorType[] = [
      {
        direction: Direction.across,
        separator: ',',
        position: { x: 5, y: 2 },
        locations: [0],
        id: '1',
      },
      {
        direction: Direction.down,
        separator: ',',
        position: { x: 2, y: 6 },
        locations: [0],
        id: '2',
      },
    ];

    const { container } = render(
      <svg>
        <Separators separators={separators} />
      </svg>,
    );

    expect(container.querySelector('line')).toBeInTheDocument();
    expect(container.querySelectorAll('line').length).toBe(2);
  });
});
