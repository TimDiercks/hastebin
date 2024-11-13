import { get } from 'svelte/store';
import { textStore, viewHasteStore } from '../stores';
import { goto } from '$app/navigation';
import { page } from '$app/stores';

export const callbackSaveHaste = async () => {
	const text = get(textStore);
	if (text === '') {
		return;
	}

	const response = await fetch('/api/addHaste', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			text,
		}),
	});

	const result = await response.json();

	if (result.success) {
		goto(`/${result.slug}`);
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
