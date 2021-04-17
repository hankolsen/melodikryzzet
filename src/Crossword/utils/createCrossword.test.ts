import createCrossword from './createCrossword';
import { CrosswordResponse } from '../Crossword.types';

describe('createCrossword test', () => {
  it('should create a crossword', () => {
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
});
