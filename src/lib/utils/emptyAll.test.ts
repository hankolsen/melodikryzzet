import type { CellType } from '$lib/types';
import { describe, expect, it } from 'vitest';
import emptyAll from '$lib/utils/emptyAll';

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
    cells[1][0] = null as unknown as CellType;
    emptyAll(cells);
    expect(cells).toStrictEqual([[{ text: '' }, { text: '' }], [null]]);
  });
});
