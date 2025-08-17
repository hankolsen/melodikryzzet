<script lang="ts">
	import { CELL_HEIGHT, CELL_WIDTH } from '$lib/constants';

	type Props = {
		row: number;
		column: number;
		number: number;
	};

	const { row, column, number }: Props = $props();
</script>

<text x={2 + column * (CELL_WIDTH + 1)} y={10 + row * (CELL_HEIGHT + 1)}>
	{number}
</text>

<style>
	text {
		font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
		font-size: 0.625rem;
		-webkit-user-select: none;
		user-select: none;
		cursor: pointer;
		fill: #222;
	}
</style>
