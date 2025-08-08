
import { MongoClient } from "mongodb";

const client = new MongoClient('mongodb+srv://Vidhun:VidhunKr@cluster0.4rthhgp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
let db;
export async function connectDB() {
  if (!db) {
    await client.connect();
    db = client.db('employeeDB');
  }
  return db;
}