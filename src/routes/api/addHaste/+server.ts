import { KEY_LENGTH } from '$lib/server/config';
import { insertHaste } from '$lib/server/database.js';
import { createPhoneticKey } from '$lib/server/slugGeneration';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
	try {
		const db = locals.db;
		const body = await request.json();
		const slug = createPhoneticKey(KEY_LENGTH);
		await insertHaste(db, slug, body.text);

		return new Response(JSON.stringify({ success: true, slug }), {
			status: 200,
		});
	} catch (error) {
		console.error('Error inserting data:', error);
		return new Response(JSON.stringify({ success: false, error: (error as Error).message }), {
			status: 500,
		});
	}
};
