<script lang="ts">
	import { CELL_WIDTH } from '$lib/constants';

	type Props = {
		row: number;
		column: number;
	};
	const { row, column }: Props = $props();

	const lineLength = 7;
	const strokeWidth = 1;

	const horizontalCoords = $derived.by(() => {
		const x1 = (column + 1) * (CELL_WIDTH + 1) - 3;
		const x2 = x1 - lineLength;
		const y1 = row * (CELL_WIDTH + 1) + 4;
		const y2 = y1;
		return { x1, y1, x2, y2 };
	});

	const verticalCoords = $derived.by(() => {
		const x1 = horizontalCoords.x1;
		const x2 = x1;
		const y1 = horizontalCoords.y1;
		const y2 = y1 + lineLength;

		return { x1, y1, x2, y2 };
	});
</script>

<g>
	<line {...horizontalCoords} stroke-width={strokeWidth} stroke="black" />
	<line {...verticalCoords} stroke-width={strokeWidth} stroke="black" />
	<path
		d={`M${verticalCoords.x1 - 2},${verticalCoords.y2} L${verticalCoords.x1 + 2},${verticalCoords.y2} L${verticalCoords.x1},${verticalCoords.y2 + 5} z`}
		fill="#000"
	/>
</g>
