const { MongoClient, ObjectId } = require('mongodb');

require('dotenv').config();

const {
  DB_NAME,
  CROSSWORD_COLLECTION_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
} = process.env;

const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true`;
let client;

const headers = {
  'Content-Type': 'application/json',
};

const getCrosswordsCollection = async () => {
  client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return client.db(DB_NAME).collection(CROSSWORD_COLLECTION_NAME);
};

const closeClient = () => {
  client.close();
};

const getCrosswords = async () => {
  const collection = await getCrosswordsCollection();
  const data = await collection.find({}).toArray();
  // eslint-disable-next-line no-underscore-dangle
  const crosswords = data.map((entry) => ({ name: entry.name, id: entry._id }));
  closeClient();
  return { crosswords };
};

const getCrossword = async (id) => {
  try {
    const collection = await getCrosswordsCollection();
    const crossword = await collection.findOne({ _id: new ObjectId(id) });
    closeClient();
    return { crossword };
  } catch (e) {
    return { crossword: undefined };
  }
};

const handleError = (err, callback) => {
  const errorCodeMap = {
    ENOTFOUND: 404,
  };

  const statusCode = errorCodeMap[err.code] || 500;
  callback(null, {
    statusCode,
    headers,
    body: '',
  });
};

const handleSuccess = (data, callback) => {
  callback(null, {
    statusCode: 200,
    headers,
    body: JSON.stringify(data),
  });
};

const handler = async (event, context, callback) => {
  const { path } = event;
  const [, id] = path.match(/\/crosswords\/(.*)/) || [];

  try {
    if (!id) {
      const { crosswords = {} } = await getCrosswords();
      return handleSuccess({ crosswords }, callback);
    }

    const { crossword } = await getCrossword(id);
    return handleSuccess({ crossword }, callback);
  } catch (err) {
    return handleError(err, callback);
  }
};

module.exports = { handler };
