import React from 'react';
import { SeparatorType } from 'Crossword/Crossword.types';
import Separator from './Separator';

type Props = {
  separators?: SeparatorType[];
};

const Separators = ({ separators }: Props) => {
  if (!separators || separators.length === 0) {
    return null;
  }
  return (
    <>
      {separators.map(({ direction, position, separator, locations, id }) => (
        <Separator
          key={`${id}-${separator}`}
          id={id}
          direction={direction}
          position={position}
          separator={separator}
          locations={locations}
        />
      ))}
    </>
  );
};

export default Separators;
