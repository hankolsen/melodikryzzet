<script lang="ts">
	import '@oddbird/popover-polyfill';

	import type { PageData } from './$types';
	import { createCrosswordContext } from '$lib/contexts/CrosswordContext.svelte';
	import CrosswordBoard from '$lib/components/crossword/CrosswordBoard.svelte';
	import Hint from '$lib/components/crossword/Hint.svelte';

	type Props = {
		data: PageData;
	};

	let { data }: Props = $props();

	const crosswordContext = createCrosswordContext(data.crossword);

	const keydown = (event: KeyboardEvent) => {
		if (event.metaKey || event.key === 'Shift') {
			return;
		}
	};
</script>

<svelte:window onkeydown={keydown} />

<div class="crossword">
	<h2>{crosswordContext.name}</h2>
	<div class="crossword-container">
		<CrosswordBoard />
		<Hint />
	</div>
</div>

<style>
	.crossword {
		padding: 1.25rem 0.625rem;
		margin: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.crossword-container {
		display: flex;
		justify-content: center;
		flex-direction: column;
		position: relative;
		width: 100%;
	}

	@media (min-width: 46.25em) {
		.crossword-container {
			width: 30.0625rem;
		}
	}

	h2 {
		margin-top: 0;
	}
</style>
