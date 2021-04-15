import clickInputReducer from './clickInputReducer';
import { CrosswordState } from '../crosswordReducer.types';
import { Direction } from '../Crossword.types';

describe('clickInputReducer test', () => {
  it('should handle click in new cell with current direction', () => {
    const firstCell = { across: '1-across' };
    const state = ({
      crossword: {
        cells: [[firstCell, {}]],
      },
      direction: Direction.across,
      selection: '1-across',
    } as unknown) as CrosswordState;
    expect(clickInputReducer(state)).toStrictEqual({
      ...state,
      currentCell: firstCell,
    });
  });

  it('should handle click in new cell without current direction', () => {
    const firstCell = { across: '1-across' };
    const state = ({
      crossword: {
        cells: [[firstCell, {}]],
      },
      direction: Direction.down,
      selection: '1-across',
    } as unknown) as CrosswordState;
    expect(clickInputReducer(state)).toStrictEqual({
      ...state,
      direction: Direction.across,
      currentCell: firstCell,
    });
  });

  it('should handle click in input', () => {
    const state = ({
      currentCell: {
        across: [],
      },
      direction: Direction.across,
    } as unknown) as CrosswordState;
    expect(clickInputReducer(state)).toStrictEqual(state);
  });

  it('should handle click in input with current direction', () => {
    const state = ({
      currentCell: {
        across: ['1-across', '4-across'],
      },
      direction: Direction.across,
      selection: '1-across',
    } as unknown) as CrosswordState;
    expect(clickInputReducer(state)).toStrictEqual({
      ...state,
      selection: '4-across',
    });
  });

  it('should handle click in input with other direction', () => {
    const state = ({
      currentCell: {
        across: ['1-across', '4-across'],
        down: ['1-down'],
      },
      direction: Direction.across,
      selection: '1-across',
    } as unknown) as CrosswordState;
    expect(clickInputReducer(state)).toStrictEqual({
      ...state,
      selection: '1-down',
      direction: Direction.down,
    });
  });
});
