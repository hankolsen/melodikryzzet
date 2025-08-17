<script lang="ts">
	import Cell from '$lib/components/cells/Cell.svelte';
	import { Confetti } from 'svelte-confetti';
	import '@oddbird/popover-polyfill';

	import type { PageData } from './$types';
	import Separators from '$lib/components/cells/Separators.svelte';
	import CellInput from '$lib/components/cells/CellInput.svelte';
	import { createCrosswordContext } from '$lib/contexts/CrosswordContext.svelte';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	type Props = {
		data: PageData;
	};

	let { data }: Props = $props();

	const crossword = $state(data.crossword);
	let isCorrect: boolean | undefined = $state();
	let showMessage = $state(false);

	const crosswordContext = createCrosswordContext(crossword);

	const { boardHeight, boardWidth, cells, separators } = $derived(crossword);

	const keydown = (event: KeyboardEvent) => {
		if (event.metaKey || event.key === 'Shift') {
			return;
		}
	};

	const onCheckSolve: SubmitFunction = () => {
		if (!crosswordContext.isFull) {
			showMessage = true;
			return;
		}
		return ({ result }) => {
			if (result.type === 'success') {
				isCorrect = result?.data?.correct;
			}
		};
	};

	let showError = $derived(isCorrect === false);

	const windowClickHandler = () => {
		isCorrect = undefined;
		showMessage = false;
	};
</script>

<svelte:window onkeydown={keydown} onclick={windowClickHandler} />

<div class="crossword">
	<h2>{crossword?.name}</h2>
	<div class="crossword-container">
		<div class="crossword-board">
			<svg class="crossword__grid" viewBox={`0 0 ${boardWidth} ${boardHeight}`}>
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
		<div class="hint">
			{#if showError}
				<p class="error">Nope, inte riktigt rätt än</p>
			{/if}
			{#if showMessage}
				<p class="message">Du måste fylla i hela kryzzet först</p>
			{/if}
		</div>
		<div class="form-buttons">
			<form method="POST" action="?/submit" use:enhance={onCheckSolve} style="position: relative;">
				<input type="hidden" name="crosswordId" value={crossword.crosswordId} />
				<button>Rätta</button>
				{#if isCorrect}
					<div class="confetti">
						<Confetti infinite y={[1, 2]} x={[-1, 1]} amount={100} cone />
					</div>
				{/if}
			</form>
			<button
				class="danger-button"
				type="button"
				popovertarget="deleteDialog"
				popovertargetaction="show">Rensa</button
			>
		</div>
	</div>
</div>

<dialog id="deleteDialog" popover>
	<form method="POST" action="?/reset">
		<p>Vill du verkligen rensa hela kryzzet?</p>
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
		flex-direction: column;
		position: relative;
		width: 100%;
	}

	.crossword-board {
		width: 100%;
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

	#deleteDialog .buttons {
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

	.confetti {
		position: absolute;
		top: 50%;
		left: 50%;
		pointer-events: none;
	}

	.form-buttons {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.hint {
		min-height: 24px;
		margin-block: 1rem;
	}

	.hint > p {
		margin: 0;
		text-align: center;
	}

	.error {
		color: red;
	}
</style>
