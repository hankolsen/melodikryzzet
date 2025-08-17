import { Direction } from '$lib/types';

export const toggleDirection = (direction: Direction) =>
	direction === Direction.across ? Direction.down : Direction.across;
