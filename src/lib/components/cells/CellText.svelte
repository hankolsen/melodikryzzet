<script lang="ts">
	import { CELL_HEIGHT, CELL_WIDTH } from '$lib/constants';

	type Props = {
		column: number;
		row: number;
		text?: string;
	};

	const { column, row, text }: Props = $props();

	const x = CELL_WIDTH / 2 + column * (CELL_WIDTH + 1);
	const y = row * (CELL_HEIGHT + 1) + 25; // Magic number to align the text vertically...
</script>

<text {x} {y} class="crossword__cell-text" text-anchor="middle">{text} </text>

<style>
  .crossword__cell-text {
    font-family: 'Indie Flower', cursive;
    font-size: 1.5rem;
    -webkit-font-smoothing: subpixel-antialiased;
  }
</style>