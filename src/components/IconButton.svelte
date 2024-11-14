<script lang="ts">
	import type { IconifyIcon } from '@iconify/svelte';
	import Icon from '@iconify/svelte';

	export let callback: () => void;
	export let ariaLabel: string;
	export let label: string;
	export let icon: IconifyIcon | string;
	export let isDisabled: (() => boolean) | undefined;
</script>

<button
	class="textHover iconButton"
	onclick={callback}
	aria-label={ariaLabel}
	disabled={isDisabled && isDisabled()}
>
	<Icon height="30" {icon} />
	<span class="md:hidden">
		{label}
	</span>
</button>
