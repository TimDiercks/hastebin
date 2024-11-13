<script lang="ts">
	import type { PageData } from './$types';
	import { viewHasteStore } from '../../stores';
	import Highlight, { LineNumbers } from 'svelte-highlight';
	import typescript from 'svelte-highlight/languages/typescript';

	let { data }: { data: PageData } = $props();
	$viewHasteStore = data.content;
</script>

<svelte:head>
	<meta property="og:site_name" content={`HasteTim - ${data.slug}`} />
	<meta property="og:title" content={`HasteTim - ${data.slug}`} />
	<meta property="og:description" content={`${data.content.substring(0, 200)}`} />
</svelte:head>

<div class="p-4 pt-28 md:pt-4">
	<div class="overflow-hidden rounded-xl">
		<Highlight language={typescript} code={data.content} let:highlighted>
			<LineNumbers {highlighted} wrapLines hideBorder />
		</Highlight>
	</div>
</div>
