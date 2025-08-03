import { type CellType, Direction } from '$lib/types';
import { describe, expect, it } from 'vitest';
import { cellIsStartingWord } from '$lib/utils/cellIsStartingWord';

describe('cellStartingWrd test', () => {
	it('should indicate a cell that starts a word', () => {
		const mockCell: CellType = {
			across: ['1-across'],
			down: ['1-down'],
			number: 1,
			row: 0,
			column: 0
		};

		let direction = Direction.across;
		expect(cellIsStartingWord({ cell: mockCell, direction })).toBe(true);
		direction = Direction.down;
		expect(cellIsStartingWord({ cell: mockCell, direction })).toBe(true);

		mockCell.number = 2;
		expect(cellIsStartingWord({ cell: mockCell, direction })).toBe(false);
		direction = Direction.across;
		expect(cellIsStartingWord({ cell: mockCell, direction })).toBe(false);

		mockCell.across = [];
		mockCell.number = 1;
		expect(cellIsStartingWord({ cell: mockCell, direction })).toBe(false);
		direction = Direction.down;
		expect(cellIsStartingWord({ cell: mockCell, direction })).toBe(true);

		mockCell.across = ['1-across', '3-across', '4-across'];
		mockCell.number = 3;
		direction = Direction.across;
		expect(cellIsStartingWord({ cell: mockCell, direction })).toBe(true);
	});
});
