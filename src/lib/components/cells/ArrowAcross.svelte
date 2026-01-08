<script lang="ts">
	import { CELL_WIDTH } from '$lib/constants';

	type Props = {
		row: number;
		column: number;
	};

	const { row, column }: Props = $props();

	const lineLength = 7;
	const strokeWidth = 1;

	const verticalCoords = $derived.by(() => {
		const x1 = column * (CELL_WIDTH + 1) + 5;
		const x2 = x1;
		const y1 = (row + 1) * (CELL_WIDTH + 1) - 10;
		const y2 = y1 + lineLength;
		return { x1, y1, x2, y2 };
	});

	const horizontalCoords = $derived.by(() => {
		const x1 = verticalCoords.x1;
		const x2 = x1 + lineLength;
		const y1 = verticalCoords.y2;
		const y2 = y1;
		return { x1, y1, x2, y2 };
	});
</script>

<g>
	<line {...verticalCoords} stroke-width={strokeWidth} stroke="black" />
	<line {...horizontalCoords} stroke-width={strokeWidth} stroke="black" />
	<path
		d={`M${horizontalCoords.x2},${horizontalCoords.y2 - 2} L${horizontalCoords.x2},${horizontalCoords.y2 + 2} L${horizontalCoords.x2 + 5},${horizontalCoords.y2} z`}
		fill="#000"
	/>
</g>
