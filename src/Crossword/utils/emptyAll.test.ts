import emptyAll from './emptyAll';
import { CellType } from '../Crossword.types';

describe('emptyAll test', () => {
  it('should empty all cells', () => {
    const cells: CellType[][] = [[]];
    emptyAll(cells);
    expect(cells).toStrictEqual([[]]);

    cells[1] = [];
    emptyAll(cells);
    expect(cells).toStrictEqual([[], []]);

    cells[0][0] = { text: 'a' } as CellType;
    cells[0][1] = { text: 'b' } as CellType;
    cells[1][0] = null as any;
    emptyAll(cells);
    expect(cells).toStrictEqual([[{ text: '' }, { text: '' }], [null]]);
  });
});
