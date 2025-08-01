<script lang="ts">
	import Separator from '$lib/components/cells/Separator.svelte';
	import type { SeparatorType } from '$lib/types';

	type Props = {
		separators?: SeparatorType[];
	};

	const { separators }: Props = $props();
</script>

{#if separators?.length}
	{#each separators as { direction, position, separator, locations, id } (`${id}-${separator}`)}
		<Separator {id} {direction} {position} {separator} {locations} />}}
	{/each}
{/if}
