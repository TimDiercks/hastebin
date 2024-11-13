<script lang="ts">
	import type { IconifyIcon } from '@iconify/svelte';
	import Icon from '@iconify/svelte';

	export let callback: () => void;
	export let ariaLabel: string;
	export let label: string;
	export let icon: IconifyIcon | string;
</script>

<button class="hover:text-slate-100" on:click={callback} aria-label={ariaLabel}>
	<Icon height="30" {icon} />
	<span class="md:hidden ">
		{label}
	</span>
</button>
