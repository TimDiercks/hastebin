import sqlite3 from 'sqlite3';
import { HASTE_LIFETIME } from './config';
import { match, P } from 'ts-pattern';
import type { Haste } from '$lib/types';

export const createDBFile = () => {
	return new sqlite3.Database('db.sqlite', (err) => {
		if (err) {
			throw err;
		}
	});
};

export const createTable = (db: sqlite3.Database) => {
	const query =
		'CREATE TABLE IF NOT EXISTS haste_list (shortcode TEXT PRIMARY KEY, text TEXT, created_at INTEGER)';
	db.run(query, (err) => {
		if (err) {
			throw err;
		}
	});
};

export const insertHaste = (db: sqlite3.Database, shortcode: string, text: string) => {
	const query = 'INSERT INTO haste_list (shortcode, text, created_at) VALUES (?, ?, ?)';
	db.run(query, [shortcode, text, Date.now()], (err) => {
		if (err) {
			throw err;
		}
	});

	// Delete old hastes whenever a new one is added
	// This is done to prevent the database from growing indefinitely
	// and is implemented like this to get around a cron job
	deleteOldHastes(db);
};

export const getHaste = async (db: sqlite3.Database, shortcode: string) => {
	const query = 'SELECT * FROM haste_list WHERE shortcode = ?';
	const result = await new Promise((resolve, reject) => {
		db.get(query, [shortcode], (err, row) => {
			if (err) {
				reject(err);
			} else {
				resolve(row);
			}
		});
	});

	return match(result)
		.with({ shortcode: P.string, text: P.string, created_at: P.number }, (row) => {
			return {
				shortcode: row.shortcode,
				text: row.text,
				created_at: new Date(row.created_at),
			} as Haste;
		})
		.otherwise(() => {
			throw new Error('No matching row found');
		});
};

// Automatically delete old hastes after given time
const deleteOldHastes = (db: sqlite3.Database) => {
	const currentTime = Date.now();
	const deleteBefore = currentTime - HASTE_LIFETIME;
	const query = 'DELETE FROM haste_list WHERE created_at < ?';
	db.run(query, [deleteBefore], (err) => {
		if (err) {
			throw err;
		}
	});
};

// This will be implemented when there is authentication
// const getAllHaste = (db: sqlite3.Database) => {
// 	const query = 'SELECT * FROM haste_list';
// 	return new Promise((resolve, reject) => {
// 		db.all(query, (err, rows) => {
// 			if (err) {
// 				reject(err);
// 			} else {
// 				resolve(rows);
// 			}
// 		});
// 	});
// };
