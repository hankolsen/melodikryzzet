<script lang="ts">
	import Cell from '$lib/components/cells/Cell.svelte';
	import Separators from '$lib/components/cells/Separators.svelte';
	import CellInput from '$lib/components/cells/CellInput.svelte';
	import { getCrosswordContext } from '$lib/contexts/CrosswordContext.svelte';

	const crosswordContext = getCrosswordContext();
	const { boardHeight, boardWidth, cells, separators } = $derived(crosswordContext);
</script>

<div class="crossword-board">
	<svg class="crossword__grid" viewBox={`0 0 ${boardWidth} ${boardHeight}`}>
		<rect x="0" y="0" width={boardWidth} height={boardHeight} class="crossword__grid-background" />
		{#each cells as row, y (y)}
			{#each row as cell, x (x)}
				{#if cell}
					<Cell
						row={y}
						column={x}
						number={cell.number}
						letter={cell.text}
						highlighted={cell.highlighted}
						selected={cell.selected}
						arrow={cell.arrow}
					/>
				{/if}
			{/each}
		{/each}
		<Separators {separators} />
	</svg>
	<CellInput />
</div>

<style>
	.crossword-board {
		width: 100%;
		position: relative;
		box-shadow:
			0 2px 2px 0 rgba(0, 0, 0, 0.14),
			0 3px 1px -2px rgba(0, 0, 0, 0.12),
			0 1px 5px 0 rgba(0, 0, 0, 0.2);
	}

	@media (min-width: 46.25em) {
		.crossword-board {
			width: 30.0625rem;
		}
	}

	.crossword__grid {
		display: block;
	}
</style>
