import { afterEach, describe, expect, it, vi } from 'vitest';
import { createCrossword } from './createCrossword';
import { type CrosswordCollection, Direction, type Entry } from '$lib/types';
import { ObjectId, type WithId } from 'mongodb';

describe('createCrossword test', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('should create an empty crossword', () => {
		const crosswordId = new ObjectId();
		const crossword = {
			size: {
				width: 2,
				height: 2
			},
			entries: [] as Entry[],
			_id: crosswordId
		} as WithId<CrosswordCollection>;
		expect(createCrossword({ crossword })).toStrictEqual({
			cells: [
				[null, null],
				[null, null]
			],
			inputWidth: 50,
			inputHeight: 50,
			numberOfColumns: 2,
			numberOfRows: 2,
			separators: [],
			crosswordId: crosswordId.toString(),
			currentCell: {
				column: 0,
				row: 0
			},
			showInput: false,
			name: undefined,
			boardWidth: 65,
			boardHeight: 65
		});
	});

	it('should create a crossword', () => {
		const crosswordId = new ObjectId();
		const crossword = {
			_id: crosswordId,
			size: {
				width: 3,
				height: 3
			},
			name: 'Kryzzet',
			entries: [
				{
					id: '2-across',
					direction: Direction.across,
					length: 2,
					position: { x: 1, y: 1 }
				},
				{
					id: '1-across',
					direction: Direction.across,
					length: 3,
					position: { x: 0, y: 0 }
				},
				{
					id: '1-down',
					direction: Direction.down,
					length: 4,
					position: { x: 0, y: 0 },
					turns: [3]
				},
				{
					id: '2-down',
					direction: Direction.down,
					length: 2,
					position: { x: 2, y: 0 },
					separatorLocations: { ',': [1] }
				}
			]
		} as WithId<CrosswordCollection>;
		expect(createCrossword({ crossword })).toStrictEqual({
			cells: [
				[
					{
						across: ['1-across'],
						down: ['1-down'],
						column: 0,
						row: 0,
						number: 1,
						text: ''
					},
					{ across: ['1-across'], column: 1, row: 0, number: null, text: '' },
					{
						across: ['1-across'],
						down: ['2-down'],
						column: 2,
						row: 0,
						number: 2,
						text: ''
					}
				],
				[
					{ down: ['1-down'], column: 0, row: 1, number: null, text: '' },
					{ across: ['3-across'], column: 1, row: 1, number: 3, text: '' },
					{
						across: ['3-across'],
						down: ['2-down'],
						column: 2,
						row: 1,
						number: null,
						text: ''
					}
				],
				[
					{
						down: ['1-down'],
						arrow: 'across',
						column: 0,
						row: 2,
						number: null,
						text: ''
					},
					{ down: ['1-down'], column: 1, row: 2, number: null, text: '' },
					null
				]
			],
			inputWidth: 33.333333333333336,
			inputHeight: 33.333333333333336,
			numberOfColumns: 3,
			numberOfRows: 3,
			separators: [
				{
					direction: Direction.down,
					position: { x: 2, y: 0 },
					id: '2-down',
					locations: [1],
					separator: ','
				}
			],
			currentCell: {
				column: 0,
				row: 0
			},
			showInput: false,
			crosswordId: crosswordId.toString(),
			name: 'Kryzzet',
			boardWidth: 97,
			boardHeight: 97
		});
	});
});
