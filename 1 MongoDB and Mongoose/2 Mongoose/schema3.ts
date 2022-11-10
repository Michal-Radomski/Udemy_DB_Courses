import mongoose from "mongoose";

const url = "mongodb://localhost:27017";

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "test",
  })
  .then(() => {
    console.log("connected to " + mongoose.connection.name);
  })
  .catch((err) => {
    console.log("cannot connect to " + mongoose.connection.name, { err });
  });

//* Two types of arrays: array: primitive & subDoc.
//* [1,2,3] & [ {doc} ]
let schema = new mongoose.Schema(
  {
    arr: [Number],
  },
  { timestamps: true }
);

console.log(schema);

const Arr = mongoose.model("Arr", schema);

const doc = new Arr({ arr: ["1", 2, 3, 4] });
const doc1 = new Arr({ arr: [2, 3, 4] });

console.log({ doc1, doc });
