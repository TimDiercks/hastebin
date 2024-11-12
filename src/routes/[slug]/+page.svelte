<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="p-4">
	<pre class="rounded-xl bg-slate-700 p-4 text-slate-300">{data.content}</pre>
</div>
