import type { Database } from 'sqlite3';

declare global {
	namespace App {
		interface Locals {
			db: Database;
		}
	}
}

export {};
