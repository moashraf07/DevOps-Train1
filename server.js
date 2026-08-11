const http = require('http');
const { MongoClient } = require('mongodb');

const port = 3000;
const mongoUri = process.env.MONGO_URI || 'mongodb://mongodb:27017/devops';

async function connectMongo() {
  const client = new MongoClient(mongoUri);
  await client.connect();
  console.log('Connected to MongoDB');
  return client;
}

let mongoClient;

async function insertSampleRecord() {
  if (!mongoClient) return;

  const db = mongoClient.db('devops');
  const collection = db.collection('messages');

  await collection.insertOne({
    name: 'Mohamed',
    message: 'Hello from Docker Compose',
    createdAt: new Date()
  });

  console.log('Sample record inserted');
}

async function startServer() {
  try {
    mongoClient = await connectMongo();
    await insertSampleRecord();
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
  }

  const server = http.createServer(async (req, res) => {
    try {
      const db = mongoClient?.db();
      const dbStatus = db ? 'connected' : 'disconnected';

      if (mongoClient) {
        await insertSampleRecord();
      }

      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>My Page</title></head><body><h1>Hello My name Mohamed enn</h1><p>MongoDB: ${dbStatus}</p></body></html>`);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Error connecting to MongoDB');
    }
  });

  server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

startServer();
