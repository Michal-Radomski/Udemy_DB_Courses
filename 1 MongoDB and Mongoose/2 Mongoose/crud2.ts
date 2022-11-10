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

let schema = new mongoose.Schema(
  {
    brand: String,
    model: String,
    year: Number,
  },
  { collection: "cars2" }
);

let Car = mongoose.model("Car", schema);

Car.find({ brand: "Honda" }, { _id: 0, __v: 0 })
  .then((result: Object) => {
    console.log({ result });
  })
  .catch((err: string) => {
    console.log({ err });
  });

// @ts-ignore
Car.find({ brand: "Honda" }, "brand model", (err: string, res: Object) => {
  if (err) throw err;
  console.log({ res });
});
