import { createDBFile, createTable } from '$lib/server/database';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (!event.locals.db) {
		// Create the database within the `db.sqlite` file.
		const db = createDBFile();

		// Set the db as our events.db variable.
		event.locals.db = db;

		// We can create a basic table in the db
		createTable(db);
	}
	const resp = await resolve(event);
	return resp;
};
