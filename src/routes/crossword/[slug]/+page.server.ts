import type { PageServerLoad } from './$types';
import { collections } from '$lib/server/mongo/database.service';
import { createCrossword } from './createCrossword';
import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	const slug = params.slug;

	const data = await collections.crosswords?.findOne({ slug });

	if (!data) {
		error(404);
	}

	const crossword = createCrossword({ crossword: data, crosswordId: data._id.toString() });
	return { crossword };
}) satisfies PageServerLoad;
