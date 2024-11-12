// Draws inspiration from pwgen and http://tools.arantius.com/password

const randOf = (collection: string) => {
	return () => {
		return collection[Math.floor(Math.random() * collection.length)];
	};
};

const randVowel = randOf('aeiou');
const randConsonant = randOf('bcdfghjklmnpqrstvwxyz');

export const createPhoneticKey = (keyLength: number) => {
	let text = '';
	const start = Math.round(Math.random());

	for (let i = 0; i < keyLength; i++) {
		text += i % 2 === start ? randConsonant() : randVowel();
	}

	return text;
};
