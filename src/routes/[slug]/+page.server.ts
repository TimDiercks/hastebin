import { error } from '@sveltejs/kit';
import { getHaste } from '$lib/server/database.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	if (params.slug === 'favicon.ico') {
		return {
			content: '',
			slug: '',
		};
	}
	const haste = await getHaste(locals.db, params.slug);

	if (haste) {
		return {
			content: haste.text,
			slug: haste.slug,
		};
	}

	error(404, 'Not found');
};
