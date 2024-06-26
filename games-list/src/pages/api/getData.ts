import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const client = new MongoClient(process.env.MONGODB_URI, {});

    try {
      await client.connect();
      const database = client.db("Conquest_db"); // name for mongoDB database
      const collection = database.collection("Conquest_collection"); // name for mongoDB collection
      const allData = await collection.find({}).toArray();

      res.status(200).json(allData);
    } catch (error) {
      res.status(500).json({ message: "ERROR!" });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed!" });
  }
}
