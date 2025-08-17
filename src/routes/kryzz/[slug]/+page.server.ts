import type { PageServerLoad } from './$types';
import { collections } from '$lib/server/mongo/database.service';
import { createCrossword } from './createCrossword';
import { type Actions, error } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

export const load = (async ({ params, cookies }) => {
	const slug = params.slug;

	const data = await collections.crosswords?.findOne({ slug });

	if (!data) {
		error(404);
	}

	const cookieContent = cookies.get(`kryzz-${data._id}`);
	const userData: string[][] | undefined = cookieContent ? JSON.parse(cookieContent) : undefined;

	const crossword = createCrossword({ crossword: data, userData });
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
	},
	submit: async ({ cookies, request }) => {
		const formData = await request.formData();
		const crosswordId = formData.get('crosswordId');
		if (!crosswordId) {
			return;
		}
		const cookieContent = cookies.get(`kryzz-${crosswordId}`);
		if (!cookieContent) {
			return;
		}
		const data = await collections.crosswords?.findOne({
			_id: new ObjectId(crosswordId.toString())
		});

		if (!data || !data.answer) {
			error(404);
		}

		const answer = data.answer;
		const entry: string[][] = JSON.parse(cookieContent);
		const correct = entry.every((row, y) =>
			row.every((cell, x) => (cell ? answer[y][x] === cell : true))
		);
		return { correct };
	}
} satisfies Actions;
