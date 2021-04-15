import handleBackspaceKey from './handleBackspaceKey';
import { CellType, Direction } from '../Crossword.types';

describe('handleBackspaceKey test', () => {
  const firstCell: CellType = {
    column: 0,
    row: 0,
    across: ['1-across'],
    down: [],
    highlighted: true,
    selected: false,
    number: 1,
    text: 'f',
  };
  const secondCell: CellType = {
    column: 1,
    row: 0,
    across: ['1-across'],
    down: [],
    highlighted: true,
    selected: true,
    text: 'u',
  };
  const currentCell: CellType = secondCell;
  const cells: CellType[][] = [[firstCell, secondCell]];
  const direction = Direction.across;
  const selection = '1-across';

  it('should handle delete text in cell', () => {
    expect(
      handleBackspaceKey({ currentCell, cells, direction, selection }),
    ).toStrictEqual({
      ...currentCell,
      text: '',
    });
  });

  it('should move to previous cell if the cell is empty', () => {
    currentCell.text = '';
    expect(
      handleBackspaceKey({ currentCell, cells, direction, selection }),
    ).toStrictEqual({
      ...firstCell,
    });
  });
});
