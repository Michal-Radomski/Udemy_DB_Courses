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

const s1 = new mongoose.Schema(
  {
    arr: [
      {
        name: String,
        ID: Number,
      },
    ],
  },
  {}
);

const s2 = new mongoose.Schema(
  {
    arr: [
      new mongoose.Schema(
        {
          name: String,
          ID: Number,
        },
        {}
      ),
    ],
  },
  {}
);

const M1 = mongoose.model("M1", s1);
const M2 = mongoose.model("M2", s2);

const doc1 = new M1({
  arr: [{ name: "Tom", ID: 100 }],
});
const doc2 = new M2({
  arr: [{ name: "Jerry", ID: 200 }],
});
console.log(JSON.stringify(doc1));
console.log(JSON.stringify(doc2));
