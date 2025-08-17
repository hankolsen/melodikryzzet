<script lang="ts">
	import type { PageData } from './$types';

	type Props = {
		data: PageData;
	};

	const { data }: Props = $props();
	const { crosswords } = $derived(data);
</script>

<h2>Välj kryzz</h2>
{#if crosswords}
	<ul>
		{#each crosswords as crossword (crossword.slug)}
			<li><a href="/kryzz/{crossword.slug}">{crossword.name}</a></li>
		{/each}
	</ul>
{/if}

<style>
	h2 {
		text-align: center;
		letter-spacing: 0.05em;
	}

	ul {
		padding: 8px 0;
		font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
	}

	@media (min-width: 46.25em) {
		ul {
			width: 30rem;
		}
	}

	li {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		min-height: 48px;
		width: 44%;
		height: auto;
		margin: 3%;
		position: relative;
		overflow: hidden;
		transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
		box-shadow: 0 1px 5px -3px rgba(0, 0, 0, 0.85);
		aspect-ratio: 1;
	}

	li:before {
		content: ' ';
		background:
			linear-gradient(rgba(184, 211, 230, 0.05), rgba(184, 211, 230, 0.6)),
			url(/button-bg.jpg) no-repeat 50%;
		background-size: auto, auto;
		background-size: cover;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0.22;
	}

	a {
		font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;

		padding: 0 16px;
		height: 100%;
		display: flex;
		width: 100%;
		align-items: inherit;
		justify-content: center;
		text-decoration: none;
		font-size: 1.5rem;
		font-weight: 500;
		text-align: center;
		z-index: 1;
		word-break: break-word;
		color: #fff;
		text-shadow: 0 2px 7px rgba(0, 0, 0, 0.75);
	}

	@media (min-width: 23.125rem) {
		a {
			font-size: 2rem;
		}
	}

	@media (min-width: 25rem) {
		a {
			font-size: 2.5rem;
		}
	}
</style>
