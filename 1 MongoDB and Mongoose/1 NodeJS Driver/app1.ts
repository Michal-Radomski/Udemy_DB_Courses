// const MongoClient = require("mongodb").MongoClient;
const { MongoClient } = require("mongodb");

// const url = 'mongodb://<user>:<password>@localhost:27017'; //* With user and password
const url = "mongodb://localhost:27017";

const client = new MongoClient(url, { useUnifiedTopology: true });
// console.log({ client });

client.connect((error: string, client: typeof MongoClient) => {
  // console.log({ client });
  if (error) {
    throw error;
  }
  client
    .db("test")
    .collection("list")
    .find({ brand: { $in: ["Toyota", "Honda"] } })
    .sort({ year: 1 })
    // .skip(4)
    // .limit(2)
    .project({ _id: 0, mileage: 0 }) //* Remove fields
    .toArray((error: string, array: Array<Object>) => {
      if (error) {
        throw error;
      }
      console.log({ array });
      client.close();
    });
  // .count((error: string, total: number) => {
  //   if (error) {
  //     throw error;
  //   }
  //   console.log("doc total: " + total);
  // });
  // client.close(); //* Wrong location
});
