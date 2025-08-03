import type { CellType } from '$lib/types';
import { describe, expect, it } from 'vitest';
import { deSelectAll } from '$lib/utils/deSelectAll';

describe('deSelectAll test', () => {
  it('should deselect all cells', () => {
    const cells: CellType[][] = [[]];
    deSelectAll();
    expect(cells).toStrictEqual([[]]);

    deSelectAll(cells);
    expect(cells).toStrictEqual([[]]);

    cells[0][0] = { selected: true } as CellType;
    cells[0][1] = { selected: false } as CellType;
    deSelectAll(cells);
    expect(cells).toStrictEqual([[{ selected: false }, { selected: false }]]);
  });
});
