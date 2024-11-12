import { getHaste } from '$lib/server/database.js';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, params }) => {
	const { slug } = params;
	const haste = await getHaste(locals.db, slug);

	return new Response(haste.text, {
		headers: {
			'Content-Type': 'text/plain',
		},
	});
};
