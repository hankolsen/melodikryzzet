import type { PageServerLoad } from './$types';
import { collections } from '$lib/server/mongo/database.service';
import { createCrossword } from './createCrossword';
import { error } from '@sveltejs/kit';

export const load = (async ({ params, cookies }) => {
	const slug = params.slug;

	const data = await collections.crosswords?.findOne({ slug });

	if (!data) {
		error(404);
	}

	const crossword = createCrossword({ crossword: data, crosswordId: data._id.toString(), cookies  });
	return { crossword };
}) satisfies PageServerLoad;
