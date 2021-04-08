import React from 'react';
import { useCrossword } from './CrosswordContext';

const ResetButton = () => {
  const { isLoading, reset } = useCrossword();
  return (
    <button onClick={reset} type="submit" className={isLoading ? 'hidden' : ''}>
      Reset
    </button>
  );
};

export default ResetButton;
