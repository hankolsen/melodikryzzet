import { CellType } from '../Crossword.types';
import deHighlightAll from './deHighlightAll';

describe('deHighlightAll test', () => {
  it('should de-highlight all cells', () => {
    const cells: CellType[][] = [[]];
    deHighlightAll();
    expect(cells).toStrictEqual([[]]);

    deHighlightAll(cells);
    expect(cells).toStrictEqual([[]]);

    cells[0][0] = { highlighted: true } as CellType;
    cells[0][1] = { highlighted: false } as CellType;
    deHighlightAll(cells);
    expect(cells).toStrictEqual([
      [{ highlighted: false }, { highlighted: false }],
    ]);
  });
});
