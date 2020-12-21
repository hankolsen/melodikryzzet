import React from 'react';
import Separator from './Separator';

const Separators = ({ separators }) => separators
  .map(({ direction, position, separator, locations, id }) => (
    <Separator
      key={`${id}-${separator}`}
      direction={direction}
      position={position}
      separator={separator}
      locations={locations}
    />
  ));

export default Separators;
