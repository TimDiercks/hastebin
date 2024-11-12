import { get } from 'svelte/store';
import { textStore } from '../stores';
import { createPhoneticKey } from './slugGeneration';
import { goto } from '$app/navigation';

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
