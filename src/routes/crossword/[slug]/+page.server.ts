import type { PageServerLoad } from './$types';
import { collections } from '$lib/server/mongo/database.service';
import { createCrossword } from './createCrossword';
import { type Actions, error } from '@sveltejs/kit';

export const load = (async ({ params, cookies }) => {
	const slug = params.slug;

	const data = await collections.crosswords?.findOne({ slug });

	if (!data) {
		error(404);
	}

	const crossword = createCrossword({ crossword: data, crosswordId: data._id.toString(), cookies });
	return { crossword };
}) satisfies PageServerLoad;

export const actions = {
	reset: async ({ cookies, request }) => {
		const formData = await request.formData();
		const crowsswordId = formData.get('crosswordId');
		if (!crowsswordId) {
			return;
		}
		cookies.delete(`kryzz-${crowsswordId}`, { path: '/' });
	}
} satisfies Actions;
