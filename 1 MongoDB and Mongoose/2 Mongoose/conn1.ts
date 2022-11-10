import mongoose from "mongoose";
// const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";

//* Mongoose
//* Second connection
// const arr_conn = mongoose.createConnection(url, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "arr" });
// console.log({ arr_conn });

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "test",
  })
  .then(() => {
    // console.log(mongoose.connections);
  })
  .catch((err) => {
    console.log(err);
  });

const schema = new mongoose.Schema(
  {
    brand: { type: String, required: true, default: "Default Brand" },
    model: String,
    year: Number,
  },
  { timestamps: true }
);
// console.log({ schema });
// console.log(mongoose.Schema.Types);
// console.log(mongoose.Types);
// console.log(mongoose.Types.ObjectId());
// @ts-ignore
// console.log(new mongoose.Types.Decimal128(128.128));

// const Car = mongoose.model("Car", schema); //* Name of collection: cars
const Car = mongoose.connection.useDb("test").model("Car", schema); //* Name of collection: cars
// console.log(mongoose.connection.modelNames());
// console.log(mongoose.connection);

Car.find({}, (err: string, resolve: Object) => {
  if (err) {
    console.log({ err });
  }
  console.log({ resolve });
});

//* MongoDB Driver
// async function read_doc(url: string, db_name: string, coll_name: string, query: Object) {
//   const client = MongoClient(url, { useUnifiedTopology: true });
//   try {
//     await client.connect();
//     const cursor = client.db(db_name).collection(coll_name).find(query);
//     const arr = await cursor.toArray();
//     const total = await cursor.count();
//     console.log("Doc Total: " + total);
//     console.log({ arr });
//   } catch (err) {
//     console.log("Err: " + { err });
//   } finally {
//     await client.close();
//   }
// }
// read_doc(url, "test", "list", { brand: "Toyota" });

let date_obj = new Date();
date_obj.setDate(date_obj.getDate() + 1);
console.log({ date_obj });
