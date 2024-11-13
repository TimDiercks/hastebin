import sqlite3 from 'sqlite3';
import { MAX_TEXT_LENGTH } from './config';
import { match, P } from 'ts-pattern';
import type { Haste } from '$lib/types';
import { dev } from '$app/environment';

export const createDBFile = () => {
	const filePath = dev ? '' : 'data/';
	return new sqlite3.Database(`${filePath}db.sqlite`, (err) => {
		if (err) {
			throw err;
		}
	});
};

export const createTable = (db: sqlite3.Database) => {
	const query =
		'CREATE TABLE IF NOT EXISTS haste_list (slug TEXT PRIMARY KEY, text TEXT, created_at INTEGER)';
	db.run(query, (err) => {
		if (err) {
			throw err;
		}
	});
};

export const insertHaste = (db: sqlite3.Database, slug: string, text: string) => {
	const query = 'INSERT INTO haste_list (slug, text, created_at) VALUES (?, ?, ?)';
	if (text.length > MAX_TEXT_LENGTH) {
		throw new Error('The given text is too long!');
	}
	slug = encodeURI(slug);
	text = encodeURI(text);
	db.run(query, [slug, text, Date.now()], (err) => {
		if (err) {
			throw err;
		}
	});
};

export const getHaste = async (db: sqlite3.Database, slug: string) => {
	slug = encodeURI(slug);
	const query = 'SELECT * FROM haste_list WHERE slug = ?';
	const result = await new Promise((resolve, reject) => {
		db.get(query, [slug], (err, row) => {
			if (err) {
				reject(err);
			} else {
				resolve(row);
			}
		});
	});

	return match(result)
		.with({ slug: P.string, text: P.string, created_at: P.number }, (row) => {
			return {
				slug: decodeURI(row.slug),
				text: decodeURI(row.text),
				created_at: row.created_at,
			} as Haste;
		})
		.otherwise(() => {
			throw new Error('No matching row found');
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
