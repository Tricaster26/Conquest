import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { mongoList } = req.body;
    console.log(mongoList);
    const client = new MongoClient(process.env.MONGODB_URI, {});

    try {
      await client.connect();
      const database = client.db("Conquest_db"); // name for mongoDB database
      const collection = database.collection("Conquest_collection"); // name for mongoDB collection

      await collection.insertOne({ id: 0, mongoList: mongoList }); //Array of saved gameObjects within "id:0" in mongoDB collection

      res.status(201).json({ message: "Data saved successfully!" });
    } catch (error) {
      res.status(500).json({ message: "ERROR!" });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed!" });
  }
}
