<script lang="ts">
	import type { IconifyIcon } from '@iconify/svelte';
	import Icon from '@iconify/svelte';

	export let callback: () => void;
	export let label: string;
	export let icon: IconifyIcon | string;
</script>

<button class="hover:text-slate-100" on:click={callback} aria-label={label}>
	<Icon height="30" {icon} />
</button>
