import type { PageServerLoad } from './$types';
import { collections } from '$lib/server/mongo/database.service';
import type { CrosswordCollection } from '$lib/types';

export const load = (async () => {
	const data = collections.crosswords?.find().project<CrosswordCollection>({ _id: 0 }); //.project({ name: 1, slug: 1});
	if (!data) {
		return;
	}

	const crosswords = await data.toArray();

	return { crosswords };
}) satisfies PageServerLoad;
