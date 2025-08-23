<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import { getCrosswordContext } from '$lib/contexts/CrosswordContext.svelte';
	import Confetti from 'svelte-confetti';
	import { isPolyfilled } from '@oddbird/popover-polyfill/fn';
	import { browser } from '$app/environment';

	const crosswordContext = getCrosswordContext();
	let showMessage = $state(false);
	let isCorrect: boolean | undefined = $state();
	let showError = $derived(isCorrect === false);

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

	const windowClickHandler = () => {
		isCorrect = undefined;
		showMessage = false;
	};
</script>

<svelte:window onclick={windowClickHandler} />

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
		<input type="hidden" name="crosswordId" value={crosswordContext.crosswordId} />
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

<dialog id="deleteDialog" popover>
	<form method="POST" action="?/reset">
		<p>Vill du verkligen rensa hela kryzzet?</p>
		<input type="hidden" name="crosswordId" value={crosswordContext.crosswordId} />
		<div class="buttons">
			<button type="button" popovertarget="deleteDialog" popovertargetaction="hide">Avbryt</button>
			{#if browser && isPolyfilled()}
				<button class="danger-button">Rensa</button>
			{:else}
				<button class="danger-button" popovertarget="deleteDialog" popovertargetaction="hide"
					>Rensa</button
				>
			{/if}
		</div>
	</form>
</dialog>

<style>
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
