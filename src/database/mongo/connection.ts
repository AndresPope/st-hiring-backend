import { Db, MongoClient } from 'mongodb';

const uri = process.env.MONGO_DB_URL || 'mongodb://localhost:27017/';

const client = new MongoClient(uri);

let dbInstance: Db;

export const connectDatabase = async () => {
  try {
    if (dbInstance) return dbInstance;
    const connection = await client.connect();
    dbInstance = connection.db('seetickets');
    return dbInstance;
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
};

export const getDbInstance = () => {
  if (!dbInstance) {
    throw new Error('Database not connected. Call connectDatabase first.');
  }
  return dbInstance;
};
