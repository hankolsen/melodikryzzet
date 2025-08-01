<script lang="ts">
	import Line from '$lib/components/Line.svelte';
	import type { Direction, Position } from '$lib/types';

	type Props = {
		direction: Direction;
		position: Position;
		separator: string;
		locations: number[];
		id: string;
	};

	const { direction, position, separator, locations, id }: Props = $props();
</script>

{#if separator === ','}
	{#each locations as location (`${id}-${location}`)}
		<Line {position} {location} {direction} />
	{/each}
	))}
{/if}
