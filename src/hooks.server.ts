import { connectToDatabase } from '$lib/server/mongo/database.service';

export const init = async () => {
	await connectToDatabase();
};
