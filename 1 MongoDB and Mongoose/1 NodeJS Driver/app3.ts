export {};
const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";

async function insert_doc(url: string, db_name: string, coll_name: string, query: Object) {
  const client = MongoClient(url, { useUnifiedTopology: true });
  try {
    await client.connect();
    let feedback = await client.db(db_name).collection(coll_name).insertMany(query);
    console.log("Number of new doc: " + feedback.insertedCount);
  } catch (err) {
    console.log("Err: " + { err });
  } finally {
    await client.close();
  }
}

insert_doc(url, "test", "list", [
  { brand: "Lexus", model: "LFA", year: 2015, mileage: 400 },
  { brand: "Ford", model: "Bronco", year: 2020, mileage: 10 },
]);

// async function create_capped_coll(url: string, db_name: string, coll_name: string, size: number) {
//   const client = MongoClient(url, { useUnifiedTopology: true });
//   try {
//     await client.connect();
//     const feedback = await client.db(db_name).createCollection(coll_name, { capped: true, size: size });
//     console.log({ feedback });
//   } catch (err) {
//     console.log("Err: " + { err });
//   } finally {
//     await client.close();
//   }
// }
// create_capped_coll(url, "test", "capped_list", 5120);
