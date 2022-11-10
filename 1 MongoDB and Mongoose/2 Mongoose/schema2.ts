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

//* Using this method -> nested schema have no _id Object
const nested_path_schema = new mongoose.Schema(
  {
    info: {
      name: String,
      ID: Number,
    },
  },
  {}
);

const Arr = mongoose.model("Arr", nested_path_schema);

console.log(nested_path_schema.path("info"));
console.log(nested_path_schema.path("info.name"));
const doc = new Arr({
  info: {
    name: "Orwell",
    ID: 1984,
  },
});
console.log(doc);
doc.save((err, res) => {
  if (err) throw err;
  console.log(res);
});
