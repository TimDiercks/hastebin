import { createDBFile, createTable } from '$lib/server/database';
import { building } from '$app/environment';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (!event.locals.db && !building) {
		const db = createDBFile();

		event.locals.db = db;

		createTable(db);
	}
	const resp = await resolve(event);
	return resp;
};
