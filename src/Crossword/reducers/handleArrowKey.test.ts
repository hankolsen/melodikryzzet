import handleArrowKey from './handleArrowKey';
import { CrosswordState } from '../crosswordReducer.types';
import { CellType, CrosswordType, Direction } from '../Crossword.types';

describe('handleArrowKey test', () => {
  let selection: string;
  let direction: Direction;
  let firstCell: CellType;
  let secondCell: CellType;
  let thirdCell: CellType;

  beforeEach(() => {
    selection = '1-across';
    direction = Direction.across;
    firstCell = {
      column: 0,
      row: 0,
      across: ['1-across'],
      down: ['1-down'],
      highlighted: true,
      selected: true,
      number: 1,
    };
    secondCell = {
      column: 1,
      row: 0,
      across: ['1-across'],
      down: [],
      selected: false,
      highlighted: true,
    };
    thirdCell = {
      column: 0,
      row: 1,
      across: [],
      down: ['1-down'],
      selected: false,
      highlighted: false,
    };
  });

  it('should handle invalid input', () => {
    const state = {
      direction,
      selection,
    } as CrosswordState;
    expect(handleArrowKey({ state, arrow: '' })).toStrictEqual(state);
  });

  it('should handle Right key', () => {
    const cells: CellType[][] = [[firstCell, secondCell]] as CellType[][];

    const state = {
      direction,
      selection,
      currentCell: firstCell,
      crossword: ({
        cells,
      } as unknown) as CrosswordType,
    } as CrosswordState;
    const arrow = 'Right';

    expect(handleArrowKey({ state, arrow })).toStrictEqual({
      currentCell: { ...secondCell, selected: true },
      cells: [
        [
          { ...firstCell, selected: false },
          { ...secondCell, selected: true },
        ],
      ],
      direction,
      selection,
    });
  });

  it('should handle Left key', () => {
    const cells: CellType[][] = [[firstCell, secondCell]] as CellType[][];

    const state = {
      direction,
      selection,
      currentCell: secondCell,
      crossword: ({
        cells,
      } as unknown) as CrosswordType,
    } as CrosswordState;
    const arrow = 'Left';

    expect(handleArrowKey({ state, arrow })).toStrictEqual({
      currentCell: { ...firstCell, selected: true },
      cells: [
        [
          { ...firstCell, selected: true },
          { ...secondCell, selected: false },
        ],
      ],
      direction,
      selection,
    });
  });

  it('should handle Down key', () => {
    const cells: CellType[][] = [
      [firstCell, secondCell],
      [thirdCell],
    ] as CellType[][];

    const state = {
      direction,
      selection,
      currentCell: firstCell,
      crossword: ({
        cells,
      } as unknown) as CrosswordType,
    } as CrosswordState;
    const arrow = 'Down';

    expect(handleArrowKey({ state, arrow })).toStrictEqual({
      currentCell: { ...thirdCell, selected: true },
      cells: [
        [
          { ...firstCell, selected: false },
          { ...secondCell, selected: false },
        ],
        [{ ...thirdCell, selected: true }],
      ],
      direction: Direction.down,
      selection: '1-down',
    });
  });

  it('should handle Up key', () => {
    const cells: CellType[][] = [
      [firstCell, secondCell],
      [thirdCell],
    ] as CellType[][];

    const state = {
      direction: Direction.down,
      selection: '1-down',
      currentCell: thirdCell,
      crossword: ({
        cells,
      } as unknown) as CrosswordType,
    } as CrosswordState;
    const arrow = 'Up';

    expect(handleArrowKey({ state, arrow })).toStrictEqual({
      currentCell: { ...firstCell, selected: true },
      cells: [
        [
          { ...firstCell, selected: true },
          { ...secondCell, selected: false },
        ],
        [{ ...thirdCell, selected: false }],
      ],
      direction: Direction.down,
      selection: '1-down',
    });
  });

  it('should return unaltered state if no movement is possible', () => {
    const cells: CellType[][] = [[firstCell, secondCell]] as CellType[][];

    const state = {
      direction,
      selection,
      currentCell: firstCell,
      crossword: ({
        cells,
      } as unknown) as CrosswordType,
    } as CrosswordState;
    const arrow = 'Up';

    expect(handleArrowKey({ state, arrow })).toStrictEqual(state);
  });
});
