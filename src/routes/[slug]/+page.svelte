<script lang="ts">
	import type { PageData } from './$types';
	import { viewHasteStore } from '../../stores';

	let { data }: { data: PageData } = $props();
	$viewHasteStore = data.content;
</script>

<div class="p-4">
	<pre class="rounded-xl bg-slate-700 p-4 text-slate-300">{data.content}</pre>
</div>
