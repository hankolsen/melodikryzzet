<script lang="ts">
	import { CELL_HEIGHT, CELL_WIDTH } from '$lib/constants';

	type Props = {
		column: number;
		row: number;
		highlighted?: boolean;
		selected?: boolean;
	};

	const { column, row, highlighted, selected }: Props = $props();
</script>

<rect
	x={1 + column * (CELL_WIDTH + 1)}
	y={1 + row * (CELL_HEIGHT + 1)}
	width={CELL_WIDTH}
	height={CELL_HEIGHT}
	class={`crossword__cell ${highlighted ? 'crossword__cell--highlighted' : ''} ${selected ? 'crossword__cell--selected' : ''}`}
/>

<style>
	.crossword__cell {
		cursor: pointer;
		fill: #fff;
	}

	.crossword__cell.crossword__cell--highlighted {
		fill: #4bc6df;
	}
	.crossword__cell.crossword__cell--selected {
		fill: #cdeff6;
	}
</style>
