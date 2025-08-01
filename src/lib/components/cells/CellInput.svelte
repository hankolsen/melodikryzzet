<script lang="ts">
	import { toggleDirection } from '$lib/components/cells/toggleDirection';
	import { getCurrentId } from '$lib/utils/getCurrentId';
	import { highlightCurrentSelection } from '$lib/utils/highlightCurrentSelection';
	import { cellContainsOtherDirection } from '$lib/utils/cellContainsOtherDirection';
	import { getCrosswordContext } from '$lib/contexts/CrosswordContext.svelte';

	const crosswordState = getCrosswordContext();

	const { inputWidth, inputHeight } = $derived(crosswordState);
	const { left, top } = $derived(crosswordState.position);

	let { currentCell, direction } = $derived(crosswordState);
	const { cells = [[]], selection } = $derived(crosswordState);
	let inputElement: HTMLInputElement | undefined = $state();

	$effect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		left;
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		top;
		inputElement?.focus();
	});

	const clickHandler = () => {
		if (currentCell) {
			if (cellContainsOtherDirection({ currentCell, direction })) {
				direction = toggleDirection(direction);
				const id = getCurrentId({ currentCell, direction, selection });
				highlightCurrentSelection({ cells, currentCell, direction, id });
				crosswordState.selection = id;
				crosswordState.direction = direction;
				return;
			}

			if (currentCell[direction].length > 1) {
				const currentIndex = currentCell[direction].indexOf(selection);
				const nextIndex = (currentIndex + 1) % currentCell[direction].length;
				const newId = currentCell[direction][nextIndex];
				highlightCurrentSelection({
					cells,
					currentCell,
					direction,
					id: newId
				});
				crosswordState.selection = newId;
				return;
			}
		} else {
			currentCell = cells[0][0];
			if (!currentCell[direction]) {
				direction = toggleDirection(direction);
			}
			const id = getCurrentId({ currentCell, direction, selection });
			highlightCurrentSelection({ cells, currentCell, direction, id });
			crosswordState.selection = id;
			crosswordState.direction = direction;
			crosswordState.currentCell = currentCell;
		}
	};
</script>

{#if crosswordState.showInput}
	<div
		class="crossword__hidden-input-wrapper"
		style="width: {inputWidth}%; height: {inputHeight}%; top: {top}%; left: {left}%;"
	>
		<input
			type="text"
			aria-label="letter"
			bind:this={inputElement}
			maxlength={1}
			value=""
			autocomplete="off"
			spellcheck="false"
			autocorrect="off"
			class="crossword__hidden-input"
			onclick={clickHandler}
		/>
	</div>
{/if}

<style>
	.crossword__hidden-input-wrapper {
		position: absolute;
	}

	input {
		border: 0;
		padding: 0;
		outline: none;
		width: 100%;
		height: 100%;
		text-align: center;
		background-color: transparent;
		font-size: 1.5rem;
		font-family: Georgia, serif;
		font-weight: 800;
		text-anchor: middle;
	}
</style>
