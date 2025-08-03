import { type CellType, Direction } from '$lib/types';
import { cellContainsOtherDirection } from '$lib/utils/cellContainsOtherDirection';
import { describe, expect, it } from 'vitest';

describe('cellContainsOtherDirection test', () => {
  it('should indicate if cell contains other direction', () => {
    let direction = Direction.across;
    const currentCell: CellType = {
      across: ['1-across'],
      down: ['1-down'],
      number: 1,
      row: 0,
      column: 0,
    };
    expect(cellContainsOtherDirection({ currentCell, direction })).toBe(true);
    direction = Direction.down;
    expect(cellContainsOtherDirection({ currentCell, direction })).toBe(true);

    currentCell.across = [];
    expect(cellContainsOtherDirection({ currentCell, direction })).toBe(false);

    currentCell.down = [];
    direction = Direction.across;
    expect(cellContainsOtherDirection({ currentCell, direction })).toBe(false);
  });
});
