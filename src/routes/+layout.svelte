<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '$lib/styles/styles.css';

	let { children } = $props();
</script>

<svelte:head>
	<link
		rel="preload"
		as="font"
		href="/fonts/IndieFlower-Regular.woff2"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<link rel="icon" href={favicon} />
</svelte:head>

<header>
	<h1><a href="/">Melodi<span>kryzzet</span></a></h1>
</header>

<div class="content">
	{@render children?.()}
</div>

<style>
	:global(body),
	header {
		background: #f9f9f9;
	}

	header {
		border-top: 8px solid #b8d3e6;
		padding: 1.3rem;
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		z-index: 2;
	}

	h1 {
		font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
		font-weight: 400;
		margin: 0;
	}

	h1 a {
		text-decoration: none;
		color: inherit;
	}

	h1 span {
		color: #0161ff;
		font-weight: 200;
	}

	.content {
		padding: 0 10px;
		margin-top: 90px;
	}
</style>
