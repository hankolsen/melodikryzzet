import React from 'react';
import { Direction, Position } from 'Crossword/Crossword.types';

import Line from './Line';

type Props = {
  direction: Direction;
  position: Position;
  separator: string;
  locations: number[];
  id: string;
};

const Separator = ({
  direction,
  position,
  separator,
  locations,
  id,
}: Props) => {
  switch (separator) {
    case ',':
      return (
        <>
          {locations.map((location) => (
            <Line
              key={`${id}-${location}`}
              position={position}
              location={location}
              direction={direction}
            />
          ))}
        </>
      );
    default:
      return null;
  }
};

export default Separator;
