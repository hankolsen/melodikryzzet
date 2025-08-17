import { toggleDirection } from '$lib/components/cells/toggleDirection';
import { describe, expect, it } from 'vitest';
import { Direction } from '$lib/types';

describe('toggleDirection test', () => {
	it('should toggle the direction', () => {
		expect(toggleDirection(Direction.across)).toBe(Direction.down);
		expect(toggleDirection(Direction.down)).toBe(Direction.across);
	});
});
