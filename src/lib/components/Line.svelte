<script lang="ts">
	import { CELL_WIDTH } from '$lib/constants';
	import { Direction, type Position } from '$lib/types';

	type Props = {
		position: Position;
		location: number;
		direction: Direction;
	};

	const { position, location, direction }: Props = $props();

	const lineLength = 11;
	const strokeWidth = 4;

	const coords = $derived.by(() => {
		let x1: number;
		let x2: number;
		let y1: number;
		let y2: number;

		if (direction === 'across') {
			x1 = (position.x + location) * (CELL_WIDTH + 1) - lineLength / 2;
			x2 = x1 + lineLength;
			y1 = CELL_WIDTH / 2 + position.y * (CELL_WIDTH + 1);
			y2 = y1;
		} else {
			x1 = position.x * (CELL_WIDTH + 1) + CELL_WIDTH / 2 + 1;
			x2 = x1;
			y1 = (position.y + location) * (CELL_WIDTH + 1) - lineLength / 2 + 1;
			y2 = y1 + lineLength;
		}

		return { x1, x2, y1, y2 };
	});
</script>

<line {...coords} stroke-width={strokeWidth} stroke="black" />
