<script lang="ts">
	import { page } from '$app/stores';
	import { callbackDuplicate, callbackNewHaste, callbackRawHaste, callbackSaveHaste } from '$lib/navbarCallbacks';
	import type { IconButtonProps, Tooltip } from '$lib/types';
	import IconButton from './IconButton.svelte';

	let currentTooltip: Tooltip | undefined;

	const navActions: IconButtonProps[] = [
		{
			icon: 'mdi:content-save',
			ariaLabel: 'save hastebin',
			label: 'save',
			callback: () => callbackSaveHaste(),
			isDisabled: () => $page.url.pathname !== "/",
			tooltip: {
				title: 'Save',
				description: 'Saves the current text as a new haste',
			},
		},
		{
			icon: 'mdi:file-document-plus',
			ariaLabel: 'create new hastebin',
			label: 'new',
			callback: () => callbackNewHaste(),
			tooltip: {
				title: 'New',
				description: 'Deletes the current text and creates a new haste',
			},
		},
		{
			icon: 'mdi:file-edit',
			ariaLabel: 'copy text into new hastebin',
			label: 'edit',
			callback: () => callbackDuplicate(),
			isDisabled: () => $page.url.pathname === "/",
			tooltip: {
				title: 'Duplicate & Edit',
				description: 'Duplicate the haste into a new one',
			},
		},
		{
			icon: 'mdi:raw',
			ariaLabel: 'see raw hastebin',
			label: 'raw',
			callback: () => callbackRawHaste(),
			isDisabled: () => $page.url.pathname === "/",
			tooltip: {
				title: 'Raw',
				description: 'Get the haste as raw text',
			},
		},
	];
</script>

<nav 
	class="z-50 fixed w-full right-0 top-0 flex md:w-52 flex-col md:gap-0 gap-4 md:rounded-bl-xl bg-slate-900 p-4 text-slate-400 md:h-auto">
	<div class="w-full flex justify-between items-center md:flex-col">
		<h1 class="ml-4 md:ml-0 md:mb-4 text-center text-3xl font-bold text-slate-400 hover:text-slate-100">
			<a href="/">HasteTim</a>
		</h1>
		<ul class="flex md:w-full w-1/2 justify-evenly md:justify-between" on:pointerleave={() => (currentTooltip = undefined)}>
			{#each navActions as { icon, ariaLabel, label, callback, isDisabled, tooltip }}
				<li on:pointerenter={() => (currentTooltip = tooltip)}>
					<IconButton {isDisabled} {ariaLabel} {callback} {icon} {label} />
				</li>
			{/each}
		</ul>
	</div>
	{#if currentTooltip}
		<div class="w-full pt-4 hidden md:block">
			<h3 class="font-bold text-slate-200">{currentTooltip.title}</h3>
			<span class="text-sm">{currentTooltip.description}</span>
		</div>
	{/if}
</nav>
