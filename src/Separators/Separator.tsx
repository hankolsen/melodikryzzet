import React from 'react';
import { Direction, Position } from 'Crossword/Crossword.types';

import Line from './Line';

type Props = {
  direction: Direction;
  position: Position;
  separator: string;
  locations: number[];
};

const Separator = ({ direction, position, separator, locations }: Props) => {
  switch (separator) {
    case ',':
      return (
        <Line position={position} locations={locations} direction={direction} />
      );
    default:
      return null;
  }
};

export default Separator;
