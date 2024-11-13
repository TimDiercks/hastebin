import type { PageServerLoad } from './$types';
import { MAX_TEXT_LENGTH } from '$lib/server/config';

export const load: PageServerLoad = async () => {
	return {
		maxTextLength: MAX_TEXT_LENGTH,
	};
};
