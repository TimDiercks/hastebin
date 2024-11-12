import { insertHaste } from '$lib/server/database.js';

export const POST = async ({ request, locals }) => {
	try {
		const db = locals.db;
		const body = await request.json();
		const result = await insertHaste(db, body.slug, body.text);

		return new Response(JSON.stringify({ success: true, result }), { status: 200 });
	} catch (error) {
		console.error('Error inserting data:', error);
		return new Response(JSON.stringify({ success: false, error: error }), {
			status: 500,
		});
	}
};
