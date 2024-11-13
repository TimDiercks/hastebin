<script lang="ts">
	import type { PageData } from './$types';
	import { viewHasteStore } from '../../stores';

	let { data }: { data: PageData } = $props();
	$viewHasteStore = data.content;
</script>

<svelte:head>
	<meta property="og:site_name" content={`HasteTim - ${data.slug}`}>
	<meta property="og:title" content={`HasteTim - ${data.slug}`} />
	<meta property="og:description" content={`${data.content.substring(0, 200)}`} />
</svelte:head>

<div class="p-4">
	<pre class="rounded-xl bg-slate-700 p-4 text-slate-300"><code>{data.content}</code></pre>
</div>
