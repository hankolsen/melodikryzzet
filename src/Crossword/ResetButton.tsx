import React from 'react';
import { useCrossword } from './CrosswordContext';

const ResetButton = () => {
  const { isLoading, reset } = useCrossword();

  if (isLoading) {
    return null;
  }

  return (
    <button onClick={reset} type="submit">
      Reset
    </button>
  );
};

export default ResetButton;
