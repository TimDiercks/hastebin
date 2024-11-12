import type { IconifyIcon } from '@iconify/svelte';

export interface Haste {
	slug: string;
	text: string;
	created_at: number;
}

export interface Tooltip {
	title: string;
	description: string;
}

export interface IconButtonProps {
	icon: IconifyIcon | string;
	label: string;
	callback: () => void;
	tooltip: Tooltip;
}
