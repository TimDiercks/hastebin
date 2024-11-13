import { get } from 'svelte/store';
import { textStore, viewHasteStore } from '../stores';
import { createPhoneticKey } from './slugGeneration';
import { goto } from '$app/navigation';
import { page } from '$app/stores';

export const callbackSaveHaste = async () => {
	const text = get(textStore);
	const slug = createPhoneticKey(8);

	const response = await fetch('/api/addHaste', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			text,
			slug,
		}),
	});

	const result = await response.json();

	if (result.success) {
		goto(`/${slug}`);
	}
};

export const callbackNewHaste = () => {
	textStore.set('');
	goto('/');
};

export const callbackDuplicate = () => {
	textStore.set(get(viewHasteStore));
	viewHasteStore.set('');
	goto('/');
};

export const callbackRawHaste = () => {
	const slug = get(page).url.pathname.replace('/', '');
	goto(`raw/${slug}`);
};
