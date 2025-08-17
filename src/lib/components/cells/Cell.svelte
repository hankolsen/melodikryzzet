<script lang="ts">
	import CellRectangle from '$lib/components/cells/CellRectangle.svelte';
	import CellLabel from '$lib/components/cells/CellLabel.svelte';
	import CellText from '$lib/components/cells/CellText.svelte';
	import ArrowAcross from '$lib/components/cells/ArrowAcross.svelte';
	import ArrowDown from '$lib/components/cells/ArrowDown.svelte';
	import { cellIsStartingWord } from '$lib/utils/cellIsStartingWord';
	import { toggleDirection } from '$lib/components/cells/toggleDirection';
	import { cellContainsOtherDirection } from '$lib/utils/cellContainsOtherDirection';
	import { cellIsStartingWordInOtherDirection } from '$lib/utils/cellIsStartinWordInOtherDirection';
	import { getCurrentId } from '$lib/utils/getCurrentId';
	import { highlightCurrentSelection } from '$lib/utils/highlightCurrentSelection';
	import { getCrosswordContext } from '$lib/contexts/CrosswordContext.svelte';

	type Props = {
		arrow?: string;
		column: number;
		highlighted?: boolean;
		letter?: string;
		number?: number;
		row: number;
		selected?: boolean;
	};

	const { arrow, column, highlighted, letter, number, row, selected }: Props = $props();

	const crosswordState = getCrosswordContext();

	let direction = $derived(crosswordState.direction);
	const { cells = [[]] } = $derived(crosswordState);
	const currentCell = $derived(cells[row][column] ?? {});

	const clickHandler = () => {
		if (
			currentCell.number &&
			!currentCell.highlighted &&
			!cellIsStartingWord({ cell: currentCell, direction }) &&
			cellContainsOtherDirection({ currentCell, direction }) &&
			cellIsStartingWordInOtherDirection({
				cell: currentCell,
				direction
			})
		) {
			direction = toggleDirection(direction);
		}

		if (!currentCell[direction] || currentCell.selected) {
			direction = toggleDirection(direction);
		}

		const id = getCurrentId({
			currentCell,
			direction,
			selection: crosswordState.selection
		});

		crosswordState.direction = direction;
		crosswordState.currentCell = currentCell;
		crosswordState.showInput = true;
		crosswordState.selection = id;

		highlightCurrentSelection({ cells, currentCell, direction, id });
	};
</script>

<!-- svelte-ignore a11y_no_static_element_interactions, a11y_click_events_have_key_events -->
<g onclick={clickHandler} data-testid="cell">
	<CellRectangle {column} {row} {selected} {highlighted} />
	{#if number}
		<CellLabel {column} {row} {number} />
	{/if}
	{#if arrow && arrow === 'across'}
		<ArrowAcross {column} {row} />
	{/if}
	{#if arrow && arrow === 'down'}
		<ArrowDown {column} {row} />
	{/if}
	<CellText {row} {column} text={letter} />
</g>
