import { MongoClient, Db, ObjectId } from 'mongodb';

let client: MongoClient;
let db: Db;

export async function connectDB(): Promise<Db> {
  if (db) {
    return db;
  }

  const uri = process.env.MONGO_URI || process.env.DATABASE_URL;
  if (!uri) {
    throw new Error('MONGO_URI or DATABASE_URL environment variable is not set');
  }

  // Create new client for each connection in serverless environment
  client = new MongoClient(uri, {
    maxPoolSize: 1, // Maintain up to 1 socket connection
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  });

  try {
    await client.connect();
    db = client.db('ohg365-data');
    console.log('✅ MongoDB connected successfully');
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to MongoDB');
  }
}

export async function closeDB() {
  if (client) {
    await client.close();
  }
}

// Helper function to convert string ID to ObjectId
export function toObjectId(id: string) {
  try {
    return new ObjectId(id);
  } catch {
    throw new Error('Invalid ObjectId format');
  }
}
