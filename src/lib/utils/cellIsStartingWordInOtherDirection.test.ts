import { type CellType, Direction } from '$lib/types';
import { describe, expect, it } from 'vitest';
import { cellIsStartingWordInOtherDirection } from '$lib/utils/cellIsStartinWordInOtherDirection';

describe('cellIsStartingWordInOtherDirection test', () => {
	it('should indicate if a cell is starting a word in the other direction', () => {
		const cell: CellType = {
			across: ['1-across'],
			down: ['1-down'],
			number: 1,
			row: 0,
			column: 0
		};
		let direction = Direction.across;
		expect(cellIsStartingWordInOtherDirection({ cell, direction })).toBe(true);
		direction = Direction.down;
		expect(cellIsStartingWordInOtherDirection({ cell, direction })).toBe(true);

		cell.across = [];
		expect(cellIsStartingWordInOtherDirection({ cell, direction })).toBe(false);
		cell.across = ['3-across'];
		expect(cellIsStartingWordInOtherDirection({ cell, direction })).toBe(false);
		cell.number = 3;
		expect(cellIsStartingWordInOtherDirection({ cell, direction })).toBe(true);
	});
});
