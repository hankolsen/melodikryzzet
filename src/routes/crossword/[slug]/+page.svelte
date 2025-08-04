<script lang="ts">
	import Cell from '$lib/components/cells/Cell.svelte';

	import type { PageData } from './$types';
	import Separators from '$lib/components/cells/Separators.svelte';
	import CellInput from '$lib/components/cells/CellInput.svelte';
	import { createCrosswordContext } from '$lib/contexts/CrosswordContext.svelte';

	type Props = {
		data: PageData;
	};

	let { data }: Props = $props();

	const crossword = $state(data.crossword);

	createCrosswordContext(crossword);

	const { boardHeight, boardWidth, cells, separators } = $derived(crossword);

	const keydown = (event: KeyboardEvent) => {
		if (event.metaKey || event.key === 'Shift') {
			return;
		}
	};
</script>

<svelte:window onkeydown={keydown} />

<div class="crossword">
	<h2>{crossword?.name}</h2>
	<div class="crossword-container">
		<div class="crossword-board">
			<svg class="crossword__grid" viewBox={`0 0 ${boardWidth} ${boardHeight}`} fill="#222222">
				<rect
					x="0"
					y="0"
					width={boardWidth}
					height={boardHeight}
					class="crossword__grid-background"
				/>
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
	</div>
	<button type="button" popovertarget="deleteDialog" popovertargetaction="show">Reset</button>
</div>

<dialog id="deleteDialog" popover>
	<p>Vill du verkligen rensa hela korsordet?</p>
	<form method="POST" action="?/reset">
		<input type="hidden" name="crosswordId" value={crossword.crosswordId} />
		<div class="buttons">
			<button type="button" popovertarget="deleteDialog" popovertargetaction="hide">Avbryt</button>
			<button class="danger-button" popovertarget="deleteDialog" popovertargetaction="hide"
				>Rensa</button
			>
		</div>
	</form>
</dialog>

<style>
	.crossword {
		padding: 1.25rem 0.625rem;
		margin: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	h2 {
		margin-top: 0;
		font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
		font-weight: 200;
		letter-spacing: 0.1em;
		color: #222;
		font-size: 1.5rem;
	}

	@media (min-width: 46.25rem) {
		h2 {
			font-size: 2rem;
		}
	}

	.crossword-container {
		display: flex;
		justify-content: center;
		position: relative;
		width: 100%;
	}

	.crossword-board {
		width: 100%;
		margin-block-end: 2rem;
		position: relative;
		box-shadow:
			0 2px 2px 0 rgba(0, 0, 0, 0.14),
			0 3px 1px -2px rgba(0, 0, 0, 0.12),
			0 1px 5px 0 rgba(0, 0, 0, 0.2);
	}

	@media (min-width: 46.25em) {
		.crossword-board,
		.crossword-container {
			width: 30.0625rem;
		}
	}

	.crossword__grid {
		display: block;
	}

	dialog p {
		font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
	}

	[popover] {
		max-width: 32em;
		border-radius: 0.25em;
		border: none;
		padding: 1em;
	}

	[popover]::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}

	[popover]:popover-open {
		animation: intro 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	@keyframes intro {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}

	[popover]:popover-open::backdrop {
		animation: outro 0.2s ease-out;
	}

	@keyframes outro {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.buttons {
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
	}

	button {
		border: none;
		height: 36px;
		min-width: 88px;
		color: rgba(0, 0, 0, 0.78);
		font-size: 14px;
		text-transform: uppercase;
		cursor: pointer;
		padding: 0 16px;
		border-radius: 1px;

		letter-spacing: 0.01em;
		font-weight: 500;
		transition:
			box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
			background-color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
	}

	button.danger-button {
		color: red;
	}
</style>
