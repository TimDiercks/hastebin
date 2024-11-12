<script lang="ts">
	import { textStore } from '../stores';
	import { callbackSaveHaste } from '$lib/navbarCallbacks';
	import type { IconButtonProps, Tooltip } from '$lib/types';
	import IconButton from './IconButton.svelte';

	let currentTooltip: Tooltip | undefined;

	const navActions: IconButtonProps[] = [
		{
			icon: 'mdi:content-save',
			label: 'save hastebin',
			callback: () => callbackSaveHaste(),
			tooltip: {
				title: 'Save',
				description: 'Saves the current text as a new haste',
			},
		},
		// {
		// 	icon: 'mdi:file-document-plus',
		// 	label: 'create new hastebin',
		// 	callback: () => console.log('Test'),
		// 	tooltip: {
		// 		title: 'New',
		// 		description: 'Deletes the current text and creates a new haste',
		// 	},
		// },
		// {
		// 	icon: 'mdi:file-edit',
		// 	label: 'copy text into new hastebin',
		// 	callback: () => console.log('Test'),
		// 	tooltip: {
		// 		title: 'Duplicate & Edit',
		// 		description: 'Dublicated the haste into a new one',
		// 	},
		// },
		// {
		// 	icon: 'mdi:raw',
		// 	label: 'see raw hastebin',
		// 	callback: () => console.log('Test'),
		// 	tooltip: {
		// 		title: 'Raw',
		// 		description: 'Get the haste as raw text',
		// 	},
		// },
	];

	const homeGoto = () => {
		$textStore = '';
	};
</script>

<nav class="fixed right-0 top-0 flex w-52 flex-col rounded-bl-xl bg-slate-900 p-4 text-slate-400">
	<h1 class="mb-4 text-center text-3xl font-bold text-slate-400 hover:text-slate-100">
		<a href="/" on:click={() => homeGoto()}>Hastebin</a>
	</h1>
	<ul class="flex justify-between" on:pointerleave={() => (currentTooltip = undefined)}>
		{#each navActions as { icon, label, callback, tooltip }}
			<li on:pointerenter={() => (currentTooltip = tooltip)}>
				<IconButton {callback} {icon} {label} />
			</li>
		{/each}
	</ul>
	{#if currentTooltip}
		<div class="w-full pt-4">
			<h3 class="font-bold text-slate-200">{currentTooltip.title}</h3>
			<span class="text-sm">{currentTooltip.description}</span>
		</div>
	{/if}
</nav>
