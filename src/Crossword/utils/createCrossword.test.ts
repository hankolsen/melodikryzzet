import createCrossword from './createCrossword';
import { CrosswordResponse, Direction } from '../Crossword.types';

describe('createCrossword test', () => {
  it('should create an empty crossword', () => {
    const crossword: CrosswordResponse['crossword'] = {
      size: {
        width: 2,
        height: 2,
      },
      entries: [] as any,
    } as CrosswordResponse['crossword'];
    const crosswordId = 'abc-123';
    expect(createCrossword({ crossword, crosswordId })).toStrictEqual({
      cells: [
        [null, null],
        [null, null],
      ],
      inputWidth: 50,
      inputHeight: 50,
      numberOfColumns: 2,
      numberOfRows: 2,
      separators: [],
      crosswordId,
      name: undefined,
      boardWidth: 65,
      boardHeight: 65,
    });
  });

  it('should create a crossword', () => {
    const crossword: CrosswordResponse['crossword'] = {
      size: {
        width: 3,
        height: 3,
      },
      name: 'Kryzzet',
      entries: [
        {
          id: '2-across',
          direction: Direction.across,
          length: 2,
          position: { x: 1, y: 1 },
        },
        {
          id: '1-across',
          direction: Direction.across,
          length: 3,
          position: { x: 0, y: 0 },
        },
        {
          id: '1-down',
          direction: Direction.down,
          length: 4,
          position: { x: 0, y: 0 },
          turns: [3],
        },
        {
          id: '2-down',
          direction: Direction.down,
          length: 2,
          position: { x: 2, y: 0 },
          separatorLocations: { ',': [1] },
        },
      ],
    } as CrosswordResponse['crossword'];
    const crosswordId = 'abc-123';
    expect(createCrossword({ crossword, crosswordId })).toStrictEqual({
      cells: [
        [
          {
            across: ['1-across'],
            down: ['1-down'],
            column: 0,
            row: 0,
            number: 1,
            text: null,
          },
          { across: ['1-across'], column: 1, row: 0, number: null, text: null },
          {
            across: ['1-across'],
            down: ['2-down'],
            column: 2,
            row: 0,
            number: 2,
            text: null,
          },
        ],
        [
          { down: ['1-down'], column: 0, row: 1, number: null, text: null },
          { across: ['3-across'], column: 1, row: 1, number: 3, text: null },
          {
            across: ['3-across'],
            down: ['2-down'],
            column: 2,
            row: 1,
            number: null,
            text: null,
          },
        ],
        [
          {
            down: ['1-down'],
            arrow: 'across',
            column: 0,
            row: 2,
            number: null,
            text: null,
          },
          { down: ['1-down'], column: 1, row: 2, number: null, text: null },
          null,
        ],
      ],
      inputWidth: 33.333333333333336,
      inputHeight: 33.333333333333336,
      numberOfColumns: 3,
      numberOfRows: 3,
      separators: [
        {
          direction: Direction.down,
          position: { x: 2, y: 0 },
          id: '2-down',
          locations: [1],
          separator: ',',
        },
      ],
      crosswordId,
      name: 'Kryzzet',
      boardWidth: 97,
      boardHeight: 97,
    });
  });
});
