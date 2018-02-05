import React from 'react';
import Line from './Line';
import ArrowRight from './ArrowRight';
import ArrowDown from './ArrowDown';

const Separator = (props) => {
  const { cellWidth, direction, position, separator, locations } = props;

  switch (separator) {
    case ',':
      return <Line position={position} locations={locations} cellWidth={cellWidth} direction={direction} />;
    case 'arrowRight':
      return <ArrowRight position={position} locations={locations} cellWidth={cellWidth} />
    case 'arrowDown':
      return <ArrowDown position={position} locations={locations} cellWidth={cellWidth} />
    default:
      return null;
  }

}

export default Separator