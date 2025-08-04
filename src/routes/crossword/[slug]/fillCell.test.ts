import { describe, expect, it } from 'vitest';
import { type CellType, Direction } from '$lib/types';
import { fillCell } from './fillCell';

describe('fillCell test', () => {
	it('should fill cells', () => {
		const row = 0;
		const column = 0;
		const index = 0;
		const number = 1;
		const id = '1-across';
		const direction = Direction.across;
		const text = 'a';
		const firstCell: CellType = {
			row,
			column,
			across: ['1-across']
		} as CellType;
		const cells = [[]];

		const expectedFirstCell = {
			...firstCell,
			text,
			number
		};
		fillCell({ cells, row, column, index, number, id, direction, text });
		expect(cells).toStrictEqual([[expectedFirstCell]]);

		const secondCell: CellType = {
			row: 0,
			column: 1,
			across: ['1-across']
		} as CellType;

		fillCell({
			cells,
			row: 0,
			column: 1,
			index: 1,
			number,
			id,
			direction,
			text: ''
		});
		const expectedSecondCell = {
			...secondCell,
			number: undefined,
			text: ''
		};
		expect(cells).toStrictEqual([[expectedFirstCell, expectedSecondCell]]);

		fillCell({
			cells,
			row: 0,
			column: 1,
			index: 1,
			number,
			id: '2-across',
			direction,
			text: ''
		});

		expect(cells).toStrictEqual([
			[expectedFirstCell, { ...expectedSecondCell, across: ['2-across', '1-across'] }]
		]);

		fillCell({
			cells,
			row: 0,
			column: 1,
			index: 2,
			number,
			id: '3-across',
			direction,
			text: '',
			hasTurn: [2]
		});

		expect(cells).toStrictEqual([
			[expectedFirstCell, { ...expectedSecondCell, across: ['2-across', '1-across', '3-across'] }]
		]);
	});
});
