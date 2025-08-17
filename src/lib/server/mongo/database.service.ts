import { type Collection, type Db, MongoClient } from 'mongodb';
import { env } from '$env/dynamic/private';
import type { CrosswordCollection } from '$lib/types';

const { DB_USERNAME, DB_PASSWORD, DB_NAME, CROSSWORD_COLLECTION_NAME } = env;

const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@melodikryzzcluster.gmnfi.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=MelodikryzzCluster`;

export const connectToDatabase = async () => {
	const client: MongoClient = new MongoClient(uri);
	await client.connect();
	const db: Db = client.db(DB_NAME);
	const crosswordsCollection: Collection<CrosswordCollection> =
		db.collection(CROSSWORD_COLLECTION_NAME);
	collections.crosswords = crosswordsCollection;
	console.log('Successfully connected to database');
};

export const collections: { crosswords?: Collection<CrosswordCollection> } = {};
