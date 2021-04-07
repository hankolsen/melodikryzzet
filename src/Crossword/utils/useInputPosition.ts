import { useCrossword } from 'Crossword/CrosswordContext';

const useInputPosition = () => {
  const { currentCell, numberOfRows = 1, numberOfColumns = 1 } = useCrossword();
  const { row = 0, column = 0 } = currentCell;
  const top = (row / numberOfRows) * 100 || 0; // (((row * CELL_HEIGHT) + 2) / boardHeight) * 100 || 0;
  const left = (column / numberOfColumns) * 100 || 0;

  return { left, top };
};

export default useInputPosition;
