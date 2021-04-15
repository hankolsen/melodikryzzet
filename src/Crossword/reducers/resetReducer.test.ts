import { CrosswordState } from '../crosswordReducer.types';
import { CrosswordType } from '../utils/createCrossword';
import resetReducer from './resetReducer';

describe('resetReducer test', () => {
  it('should clear all cells and return a new state', () => {
    const mockState: CrosswordState = {
      crossword: {
        name: 'Testkryzz',
        cells: [
          [
            { column: 0, row: 0, text: 'a' },
            { column: 1, row: 1 },
          ],
          [{ columne: 0, row: 4, text: 'b' }],
        ],
      } as CrosswordType,
    } as CrosswordState;

    expect(resetReducer(mockState)).toStrictEqual({
      crossword: {
        name: 'Testkryzz',
        cells: [
          [
            { column: 0, row: 0, text: '' },
            { column: 1, row: 1, text: '' },
          ],
          [{ columne: 0, row: 4, text: '' }],
        ],
      } as CrosswordType,
    });
  });
});
