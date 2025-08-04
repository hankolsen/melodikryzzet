<script lang="ts">
	import { toggleDirection } from '$lib/components/cells/toggleDirection';
	import { getCurrentId } from '$lib/utils/getCurrentId';
	import { highlightCurrentSelection } from '$lib/utils/highlightCurrentSelection';
	import { cellContainsOtherDirection } from '$lib/utils/cellContainsOtherDirection';
	import { getCrosswordContext } from '$lib/contexts/CrosswordContext.svelte';
	import { isValidKey } from '$lib/utils/isValidKey';
	import { deSelectAll } from '$lib/utils/deSelectAll';
	import { moveToNext } from '$lib/utils/move';
	import { getArrowKey } from '$lib/utils/getArrowKey';
	import { handleArrowKey } from '$lib/utils/handleArrowKey.svelte';
	import { isIgnorableKey } from '$lib/utils/isIgnorableKey';
	import { handleBackspaceKey } from '$lib/utils/handleBackspaceKey';
	import Cookies from 'js-cookie';

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

	const inputHandler = (
		e: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) => {
		const { value } = e.currentTarget;
		if (!isValidKey(value)) {
			return;
		}

		currentCell.text = value.toUpperCase();
		const nextCell = moveToNext({
			cells,
			direction,
			selection,
			currentCell
		});
		deSelectAll(cells);
		nextCell.selected = true;
		const entries = cells.map((row) => row.map((cell) => cell && cell.text));
		Cookies.set(`kryzz-${crosswordState.crosswordId}`, JSON.stringify(entries));
		crosswordState.currentCell = nextCell;
		e.currentTarget.value = '';
	};

	const keyUpHandler = (e: KeyboardEvent) => {
		const { key, metaKey } = e;

		if (key === 'Shift' || metaKey) {
			return;
		}

		const arrow = getArrowKey(key);
		let newState;
		if (arrow) {
			newState = handleArrowKey({
				arrow,
				row: currentCell.row,
				column: currentCell.column,
				cells,
				direction,
				selection
			});
			if (newState) {
				crosswordState.selection = newState.selection;
				crosswordState.currentCell = newState.currentCell;
				crosswordState.direction = newState.direction;
			}
			return;
		}

		if (key === 'Backspace') {
			currentCell = handleBackspaceKey({
				currentCell,
				direction,
				cells,
				selection
			});
			deSelectAll(cells);
			currentCell.selected = true;
			const entries = cells.map((row) => row.map((cell) => cell && cell.text));
			Cookies.set(`kryzz-${crosswordState.crosswordId}`, JSON.stringify(entries));
			crosswordState.currentCell = currentCell;
			crosswordState.direction = direction;
		}
		if (isIgnorableKey(key)) {
			e.preventDefault();
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
			oninput={inputHandler}
			onkeyup={keyUpHandler}
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
