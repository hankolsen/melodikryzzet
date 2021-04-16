import clickCellReducer from './clickCellReducer';
import { CellType, Direction } from '../Crossword.types';
import { CrosswordState } from '../crosswordReducer.types';

describe('clickCellReducer test', () => {
  it('should handle invalid input', () => {
    const firstCell = { down: ['2-down'] };
    const state: CrosswordState = {
      currentCell: firstCell,
    } as CrosswordState;
    expect(clickCellReducer(state, 0, 0)).toStrictEqual({
      currentCell: {},
      direction: Direction.across,
      showInput: true,
      crossword: undefined,
      selection: undefined,
    });
  });

  it('should handle click in cell', () => {
    const firstCell = { down: ['2-down'] };
    const selection = '2-down';
    const direction = Direction.across;
    const state = {
      crossword: {
        cells: [[firstCell]],
      },
      direction,
      selection,
    } as CrosswordState;
    expect(clickCellReducer(state, 0, 0)).toStrictEqual({
      ...state,
      currentCell: { ...firstCell, highlighted: true, selected: true },
      showInput: true,
      direction: Direction.down,
    });
  });

  it('should toggle direction if clicking current cell', () => {
    const firstCell: CellType = {
      column: 2,
      row: 0,
      down: ['2-down'],
      number: 2,
      across: ['1-across'],
    };
    const direction = Direction.across;
    const selection = '1-across';
    const state = {
      crossword: {
        cells: [[null, null, firstCell]],
      },
      currentCell: firstCell,
      direction,
      selection,
    } as CrosswordState;
    expect(clickCellReducer(state, 0, 2)).toStrictEqual({
      ...state,
      direction: Direction.down,
      selection: '2-down',
      showInput: true,
    });
  });

  it('should not do anything if clicking current cell with no other direction', () => {
    const firstCell: CellType = {
      column: 2,
      row: 0,
      number: 2,
      down: [],
      across: ['1-across'],
    };
    const direction = Direction.across;
    const selection = '1-across';
    const state = {
      crossword: {
        cells: [[null, null, firstCell]],
      },
      currentCell: firstCell,
      direction,
      selection,
    } as CrosswordState;
    expect(clickCellReducer(state, 0, 2)).toStrictEqual({
      ...state,
      selection: '1-across',
      showInput: true,
    });
  });
});
