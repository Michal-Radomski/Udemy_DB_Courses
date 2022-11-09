export {};
const { MongoClient, ObjectId } = require("mongodb");

const url = "mongodb://localhost:27017";

// async function update_doc(url: string, db_name: string, coll_name: string, query: Object, update: Object) {
//   const client = MongoClient(url, { useUnifiedTopology: true });
//   try {
//     await client.connect();
//     const feedback = await client.db(db_name).collection(coll_name).updateMany(query, update);
//     console.log("Number of updated doc: " + feedback.result.n);
//   } catch (err) {
//     console.log("Err: " + { err });
//   } finally {
//     await client.close();
//   }
// }

// update_doc(url, "test", "list", { _id: ObjectId("636bd70df15484e9bf6c5187") }, { $set: { mileage: 100 } });

async function delete_doc(url: string, db_name: string, coll_name: string, query: Object) {
  const client = MongoClient(url, { useUnifiedTopology: true });
  try {
    await client.connect();
    const feedback = await client.db(db_name).collection(coll_name).deleteMany(query);
    console.log("Number of deleted doc: " + feedback.result.n);
  } catch (err) {
    console.log("Err: " + { err });
  } finally {
    await client.close();
  }
}
delete_doc(url, "test", "list", { _id: ObjectId("636bd70df15484e9bf6c5187") });
