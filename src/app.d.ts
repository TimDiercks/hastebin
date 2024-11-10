import type { Database } from 'sqlite3';

declare global {
	namespace App {
		// interface Error {}

		// Uncomment the `interface Locals` and create a `db` property
		interface Locals {
			db: Database;
		}

		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
