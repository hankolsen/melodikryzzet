import { expect, it } from 'vitest';
import { describe } from 'vitest';
import { createEmptyCells } from './createEmptyCells';

describe('createEmtpyCells test', () => {
	it('should fill cells', () => {
		expect(createEmptyCells(0, 0)).toStrictEqual([]);
		expect(createEmptyCells(1, 1)).toStrictEqual([[undefined]]);
		expect(createEmptyCells(1, 2)).toStrictEqual([[undefined, undefined]]);
		expect(createEmptyCells(2, 1)).toStrictEqual([[undefined], [undefined]]);
		expect(createEmptyCells(2, 2)).toStrictEqual([
			[undefined, undefined],
			[undefined, undefined]
		]);
	});
});
