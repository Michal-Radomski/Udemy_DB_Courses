export {};
const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";

async function read_doc(url: string, db_name: string, coll_name: string, query: Object) {
  const client = MongoClient(url, { useUnifiedTopology: true });
  try {
    await client.connect();
    const cursor = client.db(db_name).collection(coll_name).find(query);
    const arr = await cursor.toArray();
    const total = await cursor.count();
    console.log("Doc Total: " + total);
    console.log({ arr });
  } catch (err) {
    console.log("Err: " + { err });
  } finally {
    await client.close();
  }
}

read_doc(url, "test", "list", { brand: "Toyota" });
read_doc(url, "test", "list", { brand: "Nissan" });
