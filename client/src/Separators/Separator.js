import React from 'react';
import PropTypes from 'prop-types';

import Line from './Line';
import ArrowRight from './ArrowRight';
import ArrowDown from './ArrowDown';

const Separator = (props) => {

  const { direction, position, separator, locations } = props;


  switch (separator) {
    case ',':
      return <Line position={position} locations={locations} direction={direction} />;
    case 'arrowRight':
      return <ArrowRight position={position} locations={locations} />;
    case 'arrowDown':
      return <ArrowDown position={position} locations={locations} />;
    default:
      return null;
  }

};

Separator.propTypes = {
  direction: PropTypes.string.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  separator: PropTypes.string.isRequired,
  locations: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Separator;
