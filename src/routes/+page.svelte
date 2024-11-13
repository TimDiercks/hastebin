<script lang="ts">
	import { textStore } from '../stores';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<meta property="og:site_name" content="HasteTim">
	<meta property="og:title" content="HasteTim" />
	<meta property="og:description" content="Simple text and code sharing" />
</svelte:head>

<div class="h-full p-6 pt-28 md:pt-6">
	<textarea
		maxlength={data.maxTextLength}
		bind:value={$textStore}
		spellcheck="false"
		class="h-full w-full resize-none rounded-xl border-2 border-slate-600 bg-slate-700 p-4 text-slate-200 outline-none focus:border-slate-400"
	></textarea>
</div>
